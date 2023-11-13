export const sendEvent = async (eventData: any) => {
  const url = '/api/sendEvent';
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData) //отправляем строку JSON с данными
    });
  } catch (error) {
    console.error('Error sending event:', error);
  }
};
