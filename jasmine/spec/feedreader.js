/* feedreader.js

* Reference: https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
* Credit to ^ Matthew Cranford ^ for an awesome walkthrough! Helped me when
* I was stuck with "Initial Entries" and "New Feed Selection" sections.

* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', () => {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */

    it('RSS are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0)
    });

    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    // almost alike as previous test with slight name changes
    it('URL defined', () => {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0)
      }
    });

    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    // same as previous test with slight name changes
    it('Name is not empty', () => {
      for (let names of allFeeds) {
        expect(names.name).toBeDefined();
        expect(names.name.length).not.toBe(0)
      }
    });

  });


  /* Write a new test suite named "The menu" */
  describe('The menu', () => {
    const body = document.querySelector('body');

    /* Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it('Menu is hidden', () => {
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

    /* Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    it('Menu toggles on/off', () => {
      const menu = document.querySelector('.menu-icon-link');
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

  });

  /* Write a new test suite named "Initial Entries" */
  describe('Initial Entries', () => {

    /* Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    beforeEach( (done) => {
      loadFeed(0, done);
    });

    it('Completes it work', () => {
      const feed = $('.feed .entry');  // suggested to use from reviewer
      expect(feed.length > 0).toBe(true);
    });
  });

  /* Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', () => {
    const feed = document.querySelector('.feed');
    const firstFeed = [];

    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    beforeEach( (done) => {
      loadFeed(0, () => {
        Array.from(feed.children).forEach( (entry) => {
          firstFeed.push(entry.innerText);
        });
        loadFeed(1, done);
      });
    });

    it('Content actually changes', () => {
      Array.from(feed.children).forEach(function(entry, index) {
        expect(entry.innerText === firstFeed[index]).toBe(false);
      });
    });

  });
}());
