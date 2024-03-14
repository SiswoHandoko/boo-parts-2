const axios = require('axios');

// Check GET Comments with all filter
axios.get('http://localhost:3001/comments?sortBy=&mbti=&enneagram=&zodiac=')
    .then(response => {
        if (response.status === 200) {
            console.log(`Check Get Comments: Success, and Get ${response.data.length} Data`);
        } else {
            console.log('Check Get Comments: Failed');
        }
    })
    .catch(error => {
        console.error('Failed: API request failed', error);
    });

// Check Create Comments 
const payload = {
    name: 'Brian Conor 2',
    comments: 'I want Elon Musk to be an INTJ more than anyone',
    mbti: 'ISFJ',
    enneagram: '1w2',
    zodiac: 'Aries'
};

axios.post('http://localhost:3001/comments', payload)
    .then(response => {
        if (response.status === 201) {
            console.log('Check Create Comments: Success');
        } else {
            console.log('Check Create Comments: Failed');
        }
    })
    .catch(error => {
        console.error('Failed: API request failed', error);
    });

axios.patch('http://localhost:3001/comments/65f2586a8d5c32a4d4a21c55', {})
    .then(response => {
        if (response.status === 200) {
            console.log('Check Like Comments: Success');
        } else {
            console.log('Check Like Comments: Failed');
        }
    })
    .catch(error => {
        console.error('Failed: API request failed', error);
    });