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
                      {videoUrl &&
                        videoUrl[index] &&
                        videoUrl[index].videoUrl.includes("mp4") ? (
                        <video controls style={{ width: '100%' }}>
                          <source src={videoUrl[index].videoUrl} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      ) :
                        <Link href={videoUrl[index].videoUrl} target='_blank'>
                          <img src={videoUrl[index].videoUrl} alt="Imagem" target="_blank" style={{ width: '100%' }} />
                        </Link>
                      }

                    </div>
                    <div className={styles.urls}>
                      <div className={styles.row}>
                        <Link href={item.html_url} target='_blank' className={styles.container}>Github</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
                      </div>
                      <div className={styles.row}>
                        <Link href={item.homepage} target='_blank' className={styles.container}>Site</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
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
