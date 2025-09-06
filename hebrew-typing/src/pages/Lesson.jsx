import { useParams } from "react-router-dom";
import { LESSONS } from "../data/lessons";
import TypingExercise from "../features/typing/TypingExercise.jsx";

export default function Lesson(){
  const { lessonId } = useParams();
  const lesson = LESSONS.find(l => l.id === lessonId);

  if (!lesson) return <div>השיעור לא נמצא.</div>;

  return (
    <section>
      <h1>{lesson.title}</h1>
      <p style={{color:"#567"}}>{lesson.desc}</p>
      <TypingExercise lessonId={lessonId} />
    </section>
  );
}
