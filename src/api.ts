export const sendEvent = async (eventData: any) => {
  try {
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // заголовок используется для указания типа содержимого тела HTTP-запроса,  он указывает, что тело запроса представляет собой данные в формате JSON.
      },
      body: JSON.stringify(eventData) //отправляем строку JSON с данными
    });
  } catch (error) {
    console.error('Error sending event:', error);
  }
};



