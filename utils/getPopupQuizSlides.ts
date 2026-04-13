import {
  quizSlidesDefault,
  quizCoursesSlides,
} from '~/components/molecules/MQuiz/newMQuizData';
import type { QuizSlide } from '~/types';


const quizSlidesDataByRoute: Record<string, QuizSlide[]> = {
  'professions': quizCoursesSlides,
  'default': quizSlidesDefault,
};

export default  function getPopupQuizSlides(routeName: string): QuizSlide[] {
  return quizSlidesDataByRoute[routeName] ?? quizSlidesDataByRoute['default'];
}
