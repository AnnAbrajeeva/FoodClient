import ContentLoader from 'react-content-loader';
import s from './Skeleton.module.scss';

const Skeleton = () => (
  <div className={s.skeleton}>
    <ContentLoader
      speed={2}
      width={360}
      height={582}
      viewBox="0 0 360 582"
      backgroundColor="#f9efeb"
      foregroundColor="#ffffff"
    >
      <rect x="2" y="-1" rx="11" ry="11" width="356" height="371" />
      <rect x="-223" y="389" rx="0" ry="0" width="360" height="13" />
      <rect x="-5" y="535" rx="0" ry="0" width="122" height="26" />
      <rect x="249" y="523" rx="13" ry="13" width="104" height="46" />
      <rect x="-6" y="450" rx="4" ry="4" width="365" height="34" />
      <rect x="2" y="416" rx="0" ry="0" width="354" height="17" />
    </ContentLoader>
  </div>
);

export default Skeleton;
