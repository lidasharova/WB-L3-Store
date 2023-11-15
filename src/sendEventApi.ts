export const sendEvent = async (eventData: any) => {
  const url = '/api/sendEvent';
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
  } catch (error) {
    console.error('Error sending event:', error);
  }
};
