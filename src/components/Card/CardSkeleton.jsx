import styles from './card.module.scss';

import React from 'react';
import ContentLoader from 'react-content-loader';

const CardSkeleton = () => (
  <li>
    <div className={`${styles.item} flex dc`}>
      <ContentLoader
        className={`${styles.skeleton}`}
        speed={2}
        viewBox="0 0 280 530"
        backgroundColor="#214d4c"
        foregroundColor="#525252"
    
      >
        <rect x="0" y="342" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="387" rx="10" ry="10" width="280" height="84" />
        <rect x="0" y="489" rx="10" ry="10" width="100" height="40" />
        <rect x="140" y="489" rx="5" ry="5" width="140" height="40" />
        <rect x="0" y="94" rx="15" ry="15" width="280" height="230" />
        <rect x="0" y="0" rx="100" ry="100" width="280" height="218" />
      </ContentLoader>
    </div>
  </li>
);

export default CardSkeleton;
