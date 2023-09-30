import { useState } from 'react'
import { linkIcon } from '../assets'

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(article.url);
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>

        <form className='flex relative justify-center items-center'
          onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link icon"
            className='absolute left-0 my-2 ml-3 w-5' />

          <input type="url" placeholder="Enter a url"
            value={article.url}
            onChange={e => setArticle({
              ...article, url: e.target.value
            })}
            required
            className='w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-12 text-sm shadow-lg focus:border-black focus:outline-none focus:ring-0 peer' />

          <button type='submit'
            className='hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700'>↲</button>
        </form>
      </div>
    </section>
  )
}

export default Demo