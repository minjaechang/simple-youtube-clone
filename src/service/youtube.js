// 네트워크 처리하는 클래스
// axios는 old version browser 지원함
import axios from 'axios';

// https://axios-http.com/docs/instance
export default class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: key },
    });
  }

  async mostPopular() {
    const response = await this.youtube.get('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
      },
    });

    // no need to format as json
    return response.data.items;
  }

  async search(query) {
    const response = await this.youtube.get('/search', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
        q: query,
      },
    });

    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));
  }
}
