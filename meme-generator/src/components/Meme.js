import React from 'react'
import memesData from "../memesData"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    // eslint-disable-next-line
    const [allMemeImages, setAllMemeImages] = React.useState(memesData);
    function getRandomMeme() {
        const memes = allMemeImages.data.memes;
        const memeUrl = memes.map(meme => meme.url);
        const randomMemeUrl = memeUrl[Math.floor(Math.random() * memeUrl.length)]
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: randomMemeUrl
        }))
    }

    function getMemeTexts(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <>
            <main>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Top text here"
                        className="form__input"
                        name="topText"
                        value={meme.topText}
                        onChange={getMemeTexts}
                    />
                    <input
                        type="text"
                        placeholder="Bottom text here"
                        className="form__input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={getMemeTexts}
                    />
                    <button className="form__btn" onClick={getRandomMeme}>Get a new meme image 🖼</button>
                </div>
                <div className='meme'>
                    <img src={meme.randomImage} alt="img" className="meme__img" />
                    <h2 className='meme__text top'>{meme.topText}</h2>
                    <h2 className='meme__text bottom'>{meme.bottomText}</h2>
                </div>
            </main>
        </>
    )
}