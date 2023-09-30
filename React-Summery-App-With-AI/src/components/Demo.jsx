import { useEffect, useState } from 'react'
import { linkIcon, copy, tick, loader } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })
  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState('')

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArr = { ...article, summary: data.summary }
      setArticle(newArr)
      const updatedAllArticles = [newArr, ...allArticles]
      setAllArticles(updatedAllArticles)

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  const handleCopy = copyUrl => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>

        <form className='flex relative justify-center items-center'
          onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link icon"
            className='absolute left-0 my-2 ml-3 w-5' />

          <input type="text" placeholder="Enter a url"
            value={article.url}
            onChange={e => setArticle({
              ...article, url: e.target.value
            })}
            required
            className='w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-12 text-sm shadow-lg focus:border-black focus:outline-none focus:ring-0 peer' />

          <button type='submit'
            className='hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700'>↲</button>
        </form>

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>

          {allArticles.length > 0 && allArticles.map((article, index) => (
            <div className='p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer'
              key={`link-${index}`}
            >
              <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)] backdrop-blur flex justify-center items-center cursor-pointer'>

                <img src={copied === article.url ? tick : copy} alt="copy btn"
                  onClick={() => handleCopy(article.url)}
                  className='w-[40%] h-[40%] object-contain' />
              </div>

              <p className='flex-1 text-blue-700 text-sm truncate font-medium'
                onClick={() => setArticle(article)}>
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>


      <div className='my-10 flex max-w-full justify-center items-center'>
        {
          isFetching ? (
            <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
          ) : error ? (
            <p className='font-bold text-black text-center'>
              Well, that wasn't supposed to be....
              <br />
              <span className='text-gray-700 font-normal'>{error?.data?.error} </span>
            </p>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-gray-600 text-xl text-center'>Article
                  <span className='font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'> Summary</span> </h2>

                <div className='rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)] backdrop-blur p-4'>
                  <p className='text-gray-600 text-sm'>{article.summary} </p>
                </div>
              </div>
            )
          )
        }
      </div>
    </section>
  )
}

export default Demo