import { BucketlistFrontPage } from './app.po';

describe('bucketlist-front App', () => {
  let page: BucketlistFrontPage;

  beforeEach(() => {
    page = new BucketlistFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
