
const videoA = {
  id: '1',
  title: 'bar',
  duration: 180,
  watched: false,
};
const videoB = {
  id: '2',
  title: 'foo',
  duration: 200,
  watched: true,
};
const videos = [videoA, videoB];
const getVideoById = (id) => new Promise((resolve) => {
  const [video] = videos.filter(video => (video.id === id));
  resolve(video);
});
export default getVideoById;