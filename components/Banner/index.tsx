/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Button from '../Button';
import { Media } from '../../types';
import { Play, Info } from '../../utils/icons';
import { ModalContext } from '../../context/ModalContext';
import styles from '../../styles/Banner.module.scss';

export default function Banner() {
  const [media, setMedia] = useState<Media>();
  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data: Media) => {
    setModalData(data);
    setIsModal(true);
  };

  const getMedia = async () => {
    try {
      const result = await axios.get('/api/trending');
      const list: Media[] = result.data.data;
      // Хамгийн өндөр rating-тайг banner-д харуулна
      const top = list.sort((a, b) => b.rating - a.rating)[0];
      setMedia(top);
    } catch (error) {}
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div className={styles.spotlight}>
      <img src={media?.banner} alt='spotlight' className={styles.spotlight__image} />
      <div className={styles.spotlight__details}>
        <div className={styles.title}>{media?.title}</div>
        <div className={styles.synopsis}>{media?.overview}</div>
        <div className={styles.buttonRow}>
          {media && (
            <Button
              label='Тоглуулах'
              filled
              Icon={Play}
              onClick={() => onClick(media)}
            />
          )}
          {media && (
            <Button
              label='Дэлгэрэнгүй'
              Icon={Info}
              onClick={() => onClick(media)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
