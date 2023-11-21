import * as cheerio from 'cheerio';
import axios from 'axios';

const getHtml = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const parsing = async (page: string) => {
  try {
    const $ = cheerio.load(page);
    const $courseList = $('.course_card_item');
    const courses: {
      title: string; // title: title,
      instructor: string; // instructor: instructor,
      price: string;
    }[] = [];
    $courseList.each((idx, node) => {
      const title = $(node).find('.course_title:eq(0)').text();
      const instructor = $(node).find('.instructor').text();
      const price = $(node).find('.price').text().split("'");

      courses.push({
        title, // title: title,
        instructor, // instructor: instructor,
        price: price[1], // price: price[1]
      });
    });

    return courses;
  } catch (error) {
    console.error(error);
  }
};

const getCourses = async (url: string) => {
  const html = await getHtml(url);
  const courses = await parsing(html.data);
  console.log(courses);
};

// getCourses('https://www.inflearn.com/courses/it-programming');
getCourses(process.argv[2]);
