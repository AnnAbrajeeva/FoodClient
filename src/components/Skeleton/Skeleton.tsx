import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={360}
    height={582}
    viewBox="0 0 360 582"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-2" y="18" rx="11" ry="11" width="360" height="360" />
    <rect x="2" y="255" rx="0" ry="0" width="269" height="77" />
    <rect x="4" y="436" rx="0" ry="0" width="360" height="51" />
    <rect x="3" y="395" rx="0" ry="0" width="360" height="28" />
    <rect x="4" y="500" rx="0" ry="0" width="122" height="42" />
    <rect x="229" y="497" rx="0" ry="0" width="129" height="43" />
  </ContentLoader>
);

export default Skeleton;
