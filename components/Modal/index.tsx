/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react';
import styles from '../../styles/Modal.module.scss';
import playerStyles from '../../styles/Player.module.scss';
import { ModalContext } from '../../context/ModalContext';
import { Play, Add, Like, Dislike } from '../../utils/icons';
import Button from '../Button';
import { Genre } from '../../types';

export default function Modal() {
  const { modalData, setIsModal, isModal } = useContext(ModalContext);
  const { title, banner, rating, overview, genre, bunnyEmbedUrl } = modalData;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClose = () => {
    setIsModal(false);
    setIsPlaying(false);
  };

  return (
    <div className={styles.container} style={{ display: isModal ? 'flex' : 'none' }}>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.modal}>

        {/* Видео тоглуулж байгаа үед iframe харагдана */}
        {isPlaying && bunnyEmbedUrl ? (
          <div className={playerStyles.playerWrapper}>
            <iframe
              src={bunnyEmbedUrl + '&autoplay=true'}
              loading="lazy"
              className={playerStyles.playerIframe}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={styles.spotlight}>
            <img src={banner} alt='spotlight' className={styles.spotlight__image} />
            <div className={styles.details}>
              <div className={styles.title}>{title}</div>
              <div className={styles.buttonRow}>
                <Button
                  label='Play'
                  filled
                  Icon={Play}
                  onClick={() => setIsPlaying(true)}
                />
                <Button Icon={Add} rounded />
                <Button Icon={Like} rounded />
                <Button Icon={Dislike} rounded />
              </div>
              <div className={styles.greenText}>{Math.round(rating * 10)}% Match</div>
            </div>
          </div>
        )}

        <div className={styles.cross} onClick={handleClose}>
          &#10005;
        </div>

        <div className={styles.bottomContainer}>
          <div className={styles.column}>{overview}</div>
          <div className={styles.column}>
            <div className={styles.genre}>Төрөл: {renderGenre(genre)} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderGenre(genre: Genre[]) {
  if (!genre?.length) return null;
  return (
    <div className={styles.row}>
      {genre.map((item, index) => {
        const isLast = index === genre.length - 1;
        return (
          <div key={index} className={styles.row}>
            <span>&nbsp;{item.name}</span>
            {!isLast && <div>,</div>}
          </div>
        );
      })}
    </div>
  );
}
