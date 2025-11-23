import React from 'react';

const containerStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '24px',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
  padding: '1.5rem 1.75rem',
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  gap: '1.25rem',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  minHeight: '420px',
};

const Chat = () => {
  const conversations = [
    { id: 1, title: 'AI Tutor • DSA Doubts', last: 'We can revise recursion with 3 examples.' },
    { id: 2, title: 'Mentor • Anjali (ML)', last: 'Send me your project outline by tonight.' },
    { id: 3, title: 'Peer Group • CN Assignment', last: 'Let’s finish Q3 and Q4 together.' },
  ];

  const messages = [
    { from: 'ai', text: 'I noticed your accuracy in recursion questions is 58%. Shall we do a quick revision set?' },
    { from: 'you', text: 'Yes, but keep them medium level. I have review tomorrow.' },
    { from: 'ai', text: 'Got it. I’ll start with 3 medium-level problems on tree recursion.' },
  ];

  return (
    <div style={containerStyle}>
      {/* Left: conversation list */}
      <div
        style={{
          borderRight: '1px solid rgba(226, 232, 240, 0.9)',
          paddingRight: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
          Messages
        </h3>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>
          Chat with AI tutor, mentors, and peers.
        </p>

        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {conversations.map((c, idx) => (
            <button
              key={c.id}
              style={{
                textAlign: 'left',
                borderRadius: '16px',
                padding: '0.55rem 0.7rem',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                background:
                  idx === 0
                    ? 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #e0f2fe 100%)'
                    : 'rgba(248, 250, 252, 0.9)',
                boxShadow:
                  idx === 0 ? '0 8px 20px rgba(148, 163, 184, 0.35)' : '0 0 0 rgba(0,0,0,0)',
              }}
            >
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: 2,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.last}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: active chat */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          height: '100%',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              borderRadius: 999,
              background: 'rgba(59,130,246,0.08)',
              color: '#1d4ed8',
              fontWeight: 500,
            }}
          >
            AI Tutor • Recursion Practice
          </span>
          <h3 style={{ margin: '0.45rem 0 0', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Intelligent Chat
          </h3>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>
            This is a static demo. In the real system, messages will stream from the AI + other users.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: '18px',
            background: 'rgba(248, 250, 252, 0.9)',
            padding: '0.9rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            overflowY: 'auto',
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.from === 'you' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background:
                  m.from === 'you'
                    ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                    : 'white',
                color: m.from === 'you' ? 'white' : '#0f172a',
                padding: '0.6rem 0.8rem',
                borderRadius:
                  m.from === 'you'
                    ? '16px 16px 2px 16px'
                    : '16px 16px 16px 2px',
                fontSize: '0.82rem',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)',
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            alignItems: 'center',
          }}
        >
          <input
            disabled
            placeholder="Type a message… (demo only)"
            style={{
              flex: 1,
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.5)',
              padding: '0.55rem 0.9rem',
              fontSize: '0.82rem',
              outline: 'none',
              background: 'rgba(248, 250, 252, 0.7)',
            }}
          />
          <button
            disabled
            style={{
              borderRadius: 999,
              border: 'none',
              padding: '0.45rem 0.9rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'rgba(148, 163, 184, 0.6)',
              color: 'white',
              cursor: 'not-allowed',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
