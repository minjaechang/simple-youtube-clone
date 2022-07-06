export default class Youtube {
  constructor(httpClient) {
    this.youtube = httpClient;
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
