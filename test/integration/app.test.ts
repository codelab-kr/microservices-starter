//
// An example of running unit tests against the "metadata" microservice using Jest.
//
import axios, { AxiosResponse } from 'axios';
import mongodb, { ObjectId } from 'mongodb';

describe('metadata microservice', () => {
  const BASE_URL = 'http://localhost:4003'; // Base URL for our HTTP server.
  const DBHOST = 'mongodb://localhost:6001'; // Have the database running on this computer.
  const DBNAME = 'testdb';

  //
  // Import the module we are testing.
  //
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { startMicroservice } = require('../src/app');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let microservice: any;

  beforeAll(async () => {
    // Start the microservice.
    microservice = await startMicroservice(DBHOST, DBNAME);
  });

  afterAll(async () => {
    // Stop the microservice.
    await microservice.close();
  });

  //
  // Wrapper function for doing a HTTP GET request so that we don't have to repeat the base URL
  // across multiple tests.
  //
  function httpGet(route: string): Promise<AxiosResponse> {
    const url = `${BASE_URL}${route}`;
    console.log(`Requesting ${url}`);
    return axios.get(url);
  }

  //
  // Helper function to load a database fixture into our database.
  //
  async function loadDatabaseFixture(
    collectionName: string,
    records: { _id: mongodb.BSON.ObjectId; videoPath: string }[],
  ): Promise<void> {
    await microservice.db.dropDatabase(); // Reset the test database.

    const collection = microservice.db.collection(collectionName);
    await collection.insertMany(records);
  }

  //
  // Tests go here.
  //
  test('/videos route retrieves data via videos collection', async () => {
    const id1 = new ObjectId();
    const id2 = new ObjectId();
    const videoPath1 = 'my-video-1.mp4';
    const videoPath2 = 'my-video-2.mp4';

    const testVideos = [
      {
        _id: id1,
        videoPath: videoPath1,
      },
      {
        _id: id2,
        videoPath: videoPath2,
      },
    ];

    // Load database fixture into the database.
    await loadDatabaseFixture('videos', testVideos);

    const response = await httpGet('/videos'); // Make a request to the videos route.
    expect(response.status).toEqual(200); // Expect HTTP status code 200 (ok).

    // Check the videos retrieved are the ones we put in the database.
    const { videos } = response.data;
    expect(videos.length).toEqual(2);
    expect(videos[0]._id).toEqual(id1.toString());
    expect(videos[0].videoPath).toEqual(videoPath1);
    expect(videos[1]._id).toEqual(id2.toString());
    expect(videos[1].videoPath).toEqual(videoPath2);
  });
});
