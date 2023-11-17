import React, { useCallback, useEffect, useState } from 'react';
import styles from './block.module.css'
import Brand from '../brand/brand';
import Link from 'next/link';

const fetchData = async (currentblock) => {
  const token = process.env.GITHUB_TOKEN;

  try {
    const resp = await fetch(`https://api.github.com/search/repositories?q=user:weslleyxd topic:${currentblock}&per_page=2`, { headers: { Authorization: `Bearer ${token}` } });

    if (!resp.ok) {
      throw new Error(`Erro na requisição: ${resp.status} - ${resp.statusText}`);
    }

    return await resp.json();

  } catch (error) {
    throw new Error(`Estamos trabalhando para corrigir o erro`);
  }
};

const fetchReadme = async (repoName) => {
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(`https://api.github.com/repos/weslleyxd/${repoName}/readme`, { headers: { Authorization: `Bearer ${token}` } });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    const conteudoBase64 = data.content;
    const conteudo = atob(conteudoBase64);

    const regex = /https?:\/\/[^\s]+\.mp4|https?:\/\/[^\s]+\.png/g;
    const match = conteudo.match(regex);

    return match ? match[0] : null;
  } catch (error) {
    throw new Error(`Erro ao obter o README.md: ${error.message}`);
  }
};

const formatDate = (dateTime) => {

  const dataObj = new Date(dateTime);

  const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, "0"); // O mês é baseado em zero, então adicionamos 1
  const ano = dataObj.getUTCFullYear().toString();

  const data = `${mes}/${ano}`
  return data;
}

const Block = ({ currentblock }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);

  const asyncFunction = useCallback(async () => {
    try {
      setLoading(true);
      const responseData = await fetchData(currentblock);
      setError(null);
      setData(responseData);

      // Realiza a segunda requisição para obter o vídeo
      const promises = responseData.items.map(async (item) => {
        const url = await fetchReadme(item.name);
        return { repoName: item.name, videoUrl: url };
      });

      const results = await Promise.all(promises);

      // Atualiza o estado com os resultados da segunda requisição
      setVideoUrl(results);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [currentblock]);

  useEffect(() => {
    asyncFunction();
  }, [asyncFunction]);

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.container}>
          {error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.content}>
              {data.items.map((item, index) => (
                <div key={index} className={styles.child}>
                  <div className={styles.left}>
                    <h2>{item.name} </h2>
                    <div className={styles.video}>
                      {videoUrl[index].videoUrl && (
                        videoUrl[index].videoUrl.includes("mp4") ? (
                          <video controls style={{ width: '100%' }}>
                            <source src={videoUrl[index].videoUrl} type="video/mp4" />
                            Seu navegador não suporta o elemento de vídeo.
                          </video>
                        ) :
                          <Link href={videoUrl[index].videoUrl} target='_blank'>
                            <img src={videoUrl[index].videoUrl} alt="Imagem" target="_blank" style={{ width: '100%' , flex:"1", alignItems: "center"}} />
                          </Link>
                      )}
                    </div>
                    <div className={styles.urls}>
                      <div className={styles.row}>
                        <Link href={item.html_url} target='_blank'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                        </Link>
                        {item.homepage && 
                          <Link href={item.homepage} target='_blank' className={styles.container}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
                        </Link>
                        }
                      </div>
                      <h3>{formatDate(item.created_at)}</h3>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <h4> {item.description} </h4>

                    <div className={styles.brand}>
                      <Brand name={item.topics} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(Block);
