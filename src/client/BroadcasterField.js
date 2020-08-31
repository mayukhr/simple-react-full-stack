import React, { useState, useEffect, useRef } from 'react';
import useWebSocketLite from './webSocketHook';

function BroadcasterField() {
  const [messagesList, setMessagesList] = useState([]);
  const txtRef = useRef();
  
  // use our hook
  const ws = useWebSocketLite({
    socketUrl: 'ws://localhost:8080'
  });

  // receive messages
  useEffect(() => {
    if (ws.data) {
      const { message } = ws.data;
      console.log('INCOMING MESSAGE===>', message);
      setMessagesList(messagesList.concat(message));
    }
  }, [ws.data]);

  // send messages
  const sendData = () => {
    const message = txtRef.current.value || '';
    if (message) {
      console.log('OUTGOING MESSAGE===>', message);
      ws.send(message);
    }
  };

  // a simple form
  return (
    <div>
      <div>
        Connection State:
        {ws.readyState ? 'Open' : 'Closed'}
      </div>

      <div>
        <form>
          <span> Message (string or json)</span>
          <input name="firstName" ref={txtRef} />
          <input type="button" onClick={sendData} value="Send" />
        </form>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {messagesList.map((Tag, i) => (
          <div key={i}>{Tag}</div>
        ))}
      </div>


    </div>
  );
}

export default BroadcasterField;
