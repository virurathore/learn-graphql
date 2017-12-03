
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
const getVideos = () => new Promise(resolve => resolve(videos));
const createVideo = ({title, duration, released}) => {
  const video = {
    id: (new Buffer(title,'utf8')).toString('base64'),
    title,
    duration,
    released,
  };
  videos.push(video);
  return video;
};
const getObjectById = (type, id) => {
  const types = {
    videotype: getVideoById,
  };
  console.log(type, id);
  return types[type](id);
}
export {
  getVideoById,
  getVideos,
  createVideo,
  getObjectById,
};