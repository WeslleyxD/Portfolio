'use client'

import Link from 'next/link';
import styles from './page.module.css'
import Brandfilter from '../../../components/brandfilter/brandFilter'
import CardProjects from '../../../components/cardProjects/cardProjects'

const formatDate = (dateTime) => {

    const dataObj = new Date(dateTime);

    const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, "0"); // O mês é baseado em zero, então adicionamos 1
    const ano = dataObj.getUTCFullYear().toString();

    const data = `${mes}/${ano}`
    return data;
}

const sortedData = (a, b) => {
    const dataA = new Date(a.created_at);
    const dataB = new Date(b.created_at);

    return dataB - dataA;
};


async function getAllProjects() {
    // Fetch data from external APi

    const token = process.env.GITHUB_TOKEN;
    try {
        const resp = await fetch(`https://api.github.com/search/repositories?q=user:weslleyxd`, { cache: 'force-cache' }, { next: { revalidate: 3600 } }, { headers: { Authorization: `Bearer ${token}` } });

        if (!resp.ok) {
            return { "error": "Erro na requisição de todos os projetos, estamos trabalhando para consertar." }
        }

        return resp.json()

    } catch (error) {
        return { "error": error.message }
    }
}

export default async function Projects() {
    let data = await getAllProjects()

    if (data.items) {
        const arrayDesc = [...data.items].sort(sortedData);
        data = arrayDesc
    }

    const itemsBackEnd = data.filter(objeto =>
        objeto.topics.includes("back-end")
    );

    const itemsFrontEnd = data.filter(objeto =>
        objeto.topics.includes("front-end")
    );

    const itemsAws = data.filter(objeto =>
        objeto.topics.includes("aws")
    );

    const dataBackEnd = {
        "name": "Django",
        "items": [{
            "name": "Django",
            "count": itemsBackEnd.filter(objeto =>
                objeto.topics.includes("django")
            ).length
        },
        {
            "name": "DjangoRest",
            "count": itemsBackEnd.filter(objeto =>
                objeto.topics.includes("django-rest-framework")
            ).length
        }],
    }
    dataBackEnd.count = dataBackEnd.items.reduce((total, item) => total + item.count, 0);

    const dataFrontEnd = {
        "name": "Front-end",
        "count": (itemsFrontEnd.length),
        "items": [{
            "name": "NextJs",
            "count": itemsFrontEnd.length
        }]
    }

    const dataAws = {
        "name": "AWS",
        "items": [{
            "name": "Appsync",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("appsync")
            ).length
        },
        {
            "name": "Cloudformation",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("cloudformation")
            ).length
        },
        {
            "name": "Dynamodb",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("dynamodb")
            ).length
        },
        {
            "name": "Sam",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("sam")
            ).length
        }]
    }
    dataAws.count = dataAws.items.reduce((total, item) => total + item.count, 0);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <Link href="/" className={styles.return}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"></path></svg> <h2>Weslley Silva</h2></Link>
                        <h1>Todos os Projetos</h1>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.leftContent}>
                            <div>
                                <Brandfilter data={dataBackEnd} />
                            </div>
                            <div>
                                <Brandfilter data={dataFrontEnd} />
                            </div>
                            <div>
                                <Brandfilter data={dataAws} />
                            </div>
                        </div>
                        <div className={styles.rightContent}>
                            {data.map((item, index) => (
                                <div key={index} className={styles.brandProjects}>
                                    <CardProjects data={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

