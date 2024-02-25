'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Brandfilter from '../../../components/brandfilter/brandFilter';
import CardProjects from '../../../components/cardProjects/cardProjects';
import Pagination from '../../../components/pagination/pagination';

const sortedData = (a, b) => {
    const dataA = new Date(a.created_at);
    const dataB = new Date(b.created_at);

    return dataB - dataA;
};

async function getAllProjects() {
    const token = process.env.GITHUB_TOKEN;

    try {
        const resp = await fetch(`https://api.github.com/search/repositories?q=user:weslleyxd`, {
            cache: 'force-cache',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!resp.ok) {
            throw new Error('Erro na requisição de todos os projetos, estamos trabalhando para consertar.');
        }

        return resp.json();
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export default function Projects() {
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await getAllProjects();
                if (projectsData.items) {
                    const arrayDesc = [...projectsData.items].sort(sortedData);

                    setData(arrayDesc);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
        setLoading(true)
    }, []);


    // Filter Side
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
            "name": "django",
            "count": itemsBackEnd.filter(objeto =>
                objeto.topics.includes("django")
            ).length
        },
        {
            "name": "django-rest-framework",
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
            "name": "next-js",
            "count": itemsFrontEnd.length
        }]
    }

    const dataAws = {
        "name": "AWS",
        "items": [{
            "name": "appsync",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("appsync")
            ).length
        },
        {
            "name": "cloudformation",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("cloudformation")
            ).length
        },
        {
            "name": "dynamodb",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("dynamodb")
            ).length
        },
        {
            "name": "sam",
            "count": itemsAws.filter(objeto =>
                objeto.topics.includes("sam")
            ).length
        }]
    }
    dataAws.count = dataAws.items.reduce((total, item) => total + item.count, 0);
    // 

    // Data Filtered Search
    var filteredData = [];

    if (searchParams.get("search")) {
        const searchArray = searchParams.get("search").split('%');

        filteredData = data.filter(objeto =>
            objeto.topics.some(topic => searchArray.includes(topic))
        )

    } else {
        filteredData = data;
    }
    // 



    // Pagination
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // 

    console.log("currentItems")
    console.log(currentItems)


    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <Link href="/" className={styles.return}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" aria-hidden="true">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"></path>
                            </svg>{' '}
                            <h2>Weslley Silva</h2>
                        </Link>
                        <h1>Todos os Projetos</h1>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.leftContent}>
                            <div>
                                <Brandfilter data={[dataBackEnd, dataFrontEnd, dataAws]} />
                            </div>
                        </div>
                        <div className={styles.rightContent}>
                            <div className={styles.rightPagination}>
                                <div className={styles.pagination}>
                                    <button disabled={!hasPreviousPage} onClick={() => handlePageChange(currentPage - 1)}>
                                        <p>Previous</p>
                                    </button>

                                    <span> {currentPage} </span>

                                    <button disabled={!hasNextPage} onClick={() => handlePageChange(currentPage + 1)}>
                                        <p>Next</p>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.rightBody}>
                                {currentItems.map((item, index) => (
                                    <div key={index}>
                                        <CardProjects data={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

