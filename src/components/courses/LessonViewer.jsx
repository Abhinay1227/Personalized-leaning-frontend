// LessonViewer.jsx
import React from 'react';

const LessonViewer = ({ lesson, onComplete }) => {
  if (!lesson) return null;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold">{lesson.title}</h2>

      <div className="mt-4">
        {lesson.content_type === 'video' || lesson.type === 'video' ? (
          <video
            src={lesson.content_url || lesson.content}
            controls
            className="w-full h-80 object-contain"
          />
        ) : (
          <div className="prose mt-3" dangerouslySetInnerHTML={{ __html: lesson.content || '<p>No content available</p>' }} />
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onComplete}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Mark as complete
        </button>
      </div>
    </div>
  );
};

export default LessonViewer;
