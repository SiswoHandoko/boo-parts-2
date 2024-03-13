## Installation

```bash
$ npm install
```

## Running the app (http://localhost:3001/comments)

```bash
$ npm run start
```

# API EXAMPLE
Request Get All Comment With Filter and Sorting [GET]:
```bash
http://localhost:3001/comments?sortBy=recent&mbti=ISFJ&enneagram=1w2&zodiac=Aries
```

Response Get All Comment With Filter and Sorting:
```bash
[
    {
        "id": "65f1bb7830c4537d468cc90c",
        "name": "A Martinez",
        "comments": "I want Elon Musk to be an INTJ more than anyone, but he isn't... People think that Elon has Ni because of his long-term vision for humanity becoming a multi-planetary species, but the way he got to this conclusion is through Ti-Ne - by envisioning all the possibilities and choosing the Ti path the makes the most sense. Elon's mannerisms, jokes, are very based on Ne. He has so much Ne that I even considered ENTP, but INTP is the most likely choice; watch the video if you're still not convinced.",
        "mbti": "ISFJ",
        "enneagram": "1w2",
        "zodiac": "Aries",
        "likes": 2
    }
]
```

Request Create Comment [POST]:
```bash
http://localhost:3001/comments

{
    "name": "Brian Conor 2",
    "comments": "I want Elon Musk to be an INTJ more than anyone, but he isn't... People think that Elon has Ni because of his long-term vision for humanity becoming a multi-planetary species, but the way he got to this conclusion is through Ti-Ne - by envisioning all the possibilities and choosing the Ti path the makes the most sense. Elon's mannerisms, jokes, are very based on Ne. He has so much Ne that I even considered ENTP, but INTP is the most likely choice; watch the video if you're still not convinced.",
    "mbti": "ISFJ",
    "enneagram": "1w2",
    "zodiac": "Aries"
}
```

Response Get All Comment With Filter and Sorting:
```bash
{
    "message": "Comment saved successfully"
}
```

Request Like Comment [PATCH]:
```bash
http://localhost:3001/comments/{id}
```

Response Get All Comment With Filter and Sorting:
```bash
{
    "message": "Likes updated successfully"
}
```
