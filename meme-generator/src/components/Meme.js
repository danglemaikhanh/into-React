import memesData from "../memesData"

export default function Meme() {
    function getRandomMeme() {
        const memes = memesData.data.memes;
        const memeUrl = memes.map(meme => meme.url);
        const randomMemeUrl = memeUrl[Math.floor(Math.random() * memeUrl.length)]
        console.log(randomMemeUrl);
    }
    return (
        <>
            <main>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Top text here"
                        className="form__input"
                    />
                    <input
                        type="text"
                        placeholder="Bottom text here"
                        className="form__input"
                    />
                    <button className="form__btn" onClick={getRandomMeme}>Get a new meme image 🖼</button>
                </div>
            </main>
        </>
    )
}