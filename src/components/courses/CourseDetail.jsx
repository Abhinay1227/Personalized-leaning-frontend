// CourseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourse, enrollCourse, markLessonComplete } from '../../api/courses';
import LessonViewer from './LessonViewer';

const DEFAULT_IMAGE = '/mnt/data/Screenshot 2025-11-23 at 13.56.14.png';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(course?.progress_percent ?? 0);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCourse(slug)
      .then(data => {
        if (!mounted) return;
        setCourse(data);
        setProgress(data.progress_percent ?? 0);
        if (data.modules && data.modules.length) {
          setActiveModule(data.modules[0]);
        }
      })
      .catch(err => {
        console.error('fetchCourse error', err);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [slug]);

  const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    try {
      await enrollCourse(course.id);
      // refetch course to get is_enrolled flag
      const updated = await fetchCourse(slug);
      setCourse(updated);
    } catch (err) {
      console.error('enroll failed', err);
      alert('Enroll failed — check console');
    } finally {
      setEnrolling(false);
    }
  };

  const onCompleteLesson = async (lessonId) => {
    // optimistic UI: increase progress a bit until server returns
    try {
      const res = await markLessonComplete(course.id, lessonId);
      // server can return new progress, but if not, refetch
      if (res && res.percent !== undefined) {
        setProgress(res.percent);
      } else {
        const up = await fetchCourse(slug);
        setCourse(up);
        setProgress(up.progress_percent ?? progress);
      }
    } catch (err) {
      console.error('markLessonComplete error', err);
    }
  };

  if (loading) return <div className="p-6">Loading course...</div>;
  if (!course) return <div className="p-6">Course not found.</div>;

  return (
    <div className="p-6">
      <div className="flex gap-6 items-start">
        <img src={course.image || course.preview_media_url || DEFAULT_IMAGE} alt={course.title} className="w-56 h-36 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{course.title}</h1>
          <p className="text-sm text-gray-600 mt-1">{course.short_description}</p>
          <div className="mt-3 flex gap-3 items-center">
            {!course.is_enrolled ? (
              <button disabled={enrolling} onClick={handleEnroll} className="px-4 py-2 bg-green-600 text-white rounded">
                {enrolling ? 'Enrolling...' : 'Enroll'}
              </button>
            ) : (
              <button onClick={() => {
                // quick resume: go to first incomplete lesson if exists
                const firstIncomplete = course.modules.flatMap(m => m.lessons).find(l => !l.completed);
                if (firstIncomplete) setActiveLesson(firstIncomplete);
                else setActiveLesson(course.modules?.[0]?.lessons?.[0] ?? null);
              }} className="px-4 py-2 bg-indigo-600 text-white rounded">
                Resume
              </button>
            )}

            <div className="text-sm text-gray-500">Progress: {progress ?? course.progress_percent ?? 0}%</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {activeLesson ? (
            <LessonViewer
              lesson={activeLesson}
              onComplete={() => onCompleteLesson(activeLesson.id)}
            />
          ) : (
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Start learning</h3>
              <p className="text-sm text-gray-600">Select a lesson from the right to start</p>
            </div>
          )}
        </div>

        <aside className="p-4 border rounded">
          <h3 className="font-semibold mb-3">Modules</h3>
          {course.modules && course.modules.map(m => (
            <div key={m.id} className="mb-3">
              <div className="flex justify-between items-center">
                <button
                  className="text-left text-sm font-medium"
                  onClick={() => {
                    setActiveModule(m);
                    // collapse/expand behavior already implied by activeModule
                  }}
                >
                  {m.title}
                </button>
                <span className="text-xs text-gray-500">{m.lessons?.length ?? 0} lessons</span>
              </div>

              {activeModule?.id === m.id && (
                <ul className="mt-2 ml-3">
                  {m.lessons && m.lessons.map(les => (
                    <li key={les.id} className="mb-1">
                      <button
                        onClick={() => setActiveLesson(les)}
                        className={`text-sm ${les.completed ? 'line-through text-gray-500' : ''}`}
                      >
                        {les.title}
                      </button>
                    </li>
                  ))}

                  {m.quiz && (
                    <li className="mt-2">
                      <button
                        onClick={() => navigate(`/courses/${slug}/quiz/${m.quiz.id}`)}
                        className="text-sm text-indigo-700 underline"
                      >
                        Take quiz: {m.quiz.title}
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
