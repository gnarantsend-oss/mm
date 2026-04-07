/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';

import { ModalContext } from '../context/ModalContext';
import styles from '../styles/Browse.module.scss';
import { Section } from '../types';

const List = dynamic(import('../components/List'));
const Modal = dynamic(import('../components/Modal'));
const Layout = dynamic(import('../components/Layout'));
const Banner = dynamic(import('../components/Banner'));

export default function Browse(): React.ReactElement {
  const { isModal } = useContext(ModalContext);
  return (
    <>
      {isModal && <Modal />}
      <Layout>
        <Banner />
        <div className={styles.contentContainer}>
          {sections.map((item, index) => {
            return (
              <List
                key={index}
                heading={item.heading}
                endpoint={item.endpoint}
                defaultCard={item?.defaultCard}
                topList={item?.topList}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
}

const sections: Section[] = [
  {
    heading: 'Одоо үзэж байгаа',
    endpoint: '/api/popular'
  },
  {
    heading: 'Монгол кинонууд',
    endpoint: '/api/discover?genre=Монгол+кино',
    defaultCard: false
  },
  {
    heading: 'Шинэ нэмэгдсэн',
    endpoint: '/api/discover?tag=new'
  },
  {
    heading: 'Trending — Хамгийн их үзэж байгаа',
    endpoint: '/api/trending'
  },
  {
    heading: 'Хошин кинонууд',
    endpoint: '/api/discover?genre=Хошин'
  },
  {
    heading: 'Шилдэг 10',
    endpoint: '/api/discover?tag=top10',
    topList: true
  },
  {
    heading: 'Драм кинонууд',
    endpoint: '/api/discover?genre=Драм'
  },
  {
    heading: 'Аймшгийн кинонууд',
    endpoint: '/api/discover?genre=Аймшиг'
  },
  {
    heading: 'Адал явдалт',
    endpoint: '/api/discover?genre=Адал+явдал'
  },
  {
    heading: 'Романтик',
    endpoint: '/api/discover?genre=Романтик'
  }
];
