import React from 'react'

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMeme, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getRandomMeme() {
        const memeUrl = allMeme.map(meme => meme.url);
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