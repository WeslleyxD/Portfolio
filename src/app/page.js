'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import Image from 'next/image'
import styles from './page.module.css'


import Preloader from '../../components/preloader/preloader';
import Anchor from '../../components/anchor/anchor';
import CardExp from '../../components/card_exp/cardExp'
import Projects from '../../components/projects/projects';


import Aos from 'aos';
import 'aos/dist/aos.css'



export default function App() {

  const [loading, setLoading] = useState(true);
  const aboutRef = useRef(null);
  const tecnologiesRef = useRef(null);
  const experiencesRef = useRef(null);
  const certifiedsRef = useRef(null);
  const projectsRef = useRef(null);
  const [menuSelect, setMenuSelect] = useState("SOBRE");

  const handleScroll = useCallback(() => {
    if (aboutRef.current != null && tecnologiesRef.current != null && experiencesRef.current != null && projectsRef.current != null) {
      const windowTop = window.scrollY + 100
      const windowBot = window.scrollX + 100

      const aboutPositionBottom = aboutRef.current.offsetTop + aboutRef.current.offsetHeight
      const tecnologiesPositionBottom = tecnologiesRef.current.offsetTop + tecnologiesRef.current.offsetHeight
      const experiencesPositionBottom = experiencesRef.current.offsetTop + experiencesRef.current.offsetHeight
      const certifiedsPositionBottom = certifiedsRef.current.offsetTop

      const projectsPositionBottom = projectsRef.current.offsetTop + projectsRef.current.offsetHeight

      let menuActive = "";
      if (aboutPositionBottom > windowTop) {
        menuActive = "SOBRE";
      } else if (tecnologiesPositionBottom > windowTop) {
        menuActive = "TECNOLOGIAS";
      } else if (experiencesPositionBottom > windowTop) {
        menuActive = "EXPERIÊNCIAS";
      } else if (certifiedsPositionBottom > windowTop) {
        menuActive = "CERTIFICADOS";
      } else if (projectsPositionBottom > windowBot) {
        menuActive = "PROJETOS";
      } else {
        menuActive = "PROJETOS";
      }

      setMenuSelect(menuActive);
    };
  }, []);

  useEffect(() => {
    Aos.init(({ duration: 2000, once: true }))

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleStateChange = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <>
      <main>
        {loading ? (
          <Preloader onChange={handleStateChange} />
        ) : (
          <section>
            <header className={styles.header}>
              <div data-aos="fade-up" data-aos-delay="400">
                <h1>Weslley Araújo</h1>
                <h2>Full-stack Developer</h2>
              </div>
              <ul className={styles.options} data-aos="fade-up" data-aos-delay="400">
                <Anchor href="#about" title="SOBRE" menu={menuSelect} />
                <Anchor href="#technologies" title="TECNOLOGIAS" menu={menuSelect} />
                <Anchor href="#experiences" title="EXPERIÊNCIAS" menu={menuSelect} />
                <Anchor href="#certifieds" title="CERTIFICADOS" menu={menuSelect} />
                <Anchor href="#projects" title="PROJETOS" menu={menuSelect} />
              </ul>
              <div data-aos="fade-up" data-aos-delay="700" className={styles.links}>
                <Link href='https://www.linkedin.com/in/weslley-pablo/' target='_blank' ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg></Link>
                <Link href='https://github.com/WeslleyxD' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg></Link>

                <Link href="cv.pdf" target='_blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-cv" viewBox="0 0 24 24" width="40" height="40" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                    <path d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
                    <path d="M13 11l1.5 6l1.5 -6" />
                  </svg>
                </Link>
              </div>
            </header>
            <aside className={styles.main}>
              <div ref={aboutRef} id="about" className={styles.about} data-aos="fade-up" data-aos-delay="700">
                <div className={styles.hidden}>
                  <span>#</span><p>SOBRE</p>
                </div>
                <p>
                  <span>Saudações!</span> Sou um desenvolvedor apaixonado por tecnologia, nascido em Recife e atualmente resido em São Paulo. Minha jornada começou quando decidi expandir meus conhecimentos e explorar o mundo das tecnologias em uma cidade vibrante como São Paulo.
                </p>
                <p>
                  Meu diferencial é construir aplicações <span>serverless</span> seguindo à risca os <Link href="https://aws.amazon.com/blogs/compute/applying-the-twelve-factor-app-methodology-to-serverless-applications/" target='_blank' textDecoration="inderline"><span>os 12 fatores serverless</span></Link> em arquitetura de <span>microsserviços</span>. Além disso, atuo também em construções de aplicações <span>monolito</span>. E o mais importante, fanático em estudar e aperfeiçoar meus conhecimentos conforme as tecnologias mais recentes.
                </p>
              </div>

              <div ref={tecnologiesRef} className={styles.technologies} id="technologies" data-aos="fade-up" data-aos-delay="700">
                <div className={styles.hidden}>
                  <span>#</span><p>TECNOLOGIAS</p>
                </div>
                <div className={styles.images}>
                  <Image src="/python.svg" alt="python" width="64" height="64" title="Python" />
                  <Image src="/drfff.png" alt="drf" width="64" height="64" title="Djangorest-framework" />
                  <Image src="/django.svg" alt="drf" width="64" height="64" title="Django" />
                  <Image src="/html5.svg" alt="html5" width="64" height="64" title="Html" />
                  <Image src="/css3.svg" alt="css3" width="64" height="64" title="Css" />
                  <Image src="/javascript.svg" alt="mjavascripte" width="64" height="64" title="Javascript" />
                  <Image src="/docker.svg" alt="docker" width="64" height="64" title="Docker" />
                  <Image src="/github.svg" alt="github" width="64" height="64" title="Github" />
                  <Image src="/jira.svg" alt="jira" width="64" height="64" title="Jira" />
                  <Image src="/linux.svg" alt="jira" width="64" height="64" title="Linux" />
                </div>
                <div className={styles.images}>
                  <Image src="/aws.svg" alt="aws" width="64" height="64" title="Amazon Web Service" />
                  <Image src="/lambda.svg" alt="lambda" width="64" height="64" title="Lambda" />
                  <Image src="/ecr.svg" alt="ecr" width="64" height="64" title="Elastic Container Registry" />
                  <Image src="/sam.svg" alt="sam" width="64" height="64" title="Serverless Application Model" />
                  <Image src="/apprunner.svg" alt="apprunner" width="64" height="64" title="AppRunner" />
                  <Image src="/dynamodb.svg" alt="dynamodb" width="64" height="64" title="DynamoDB" />
                  <Image src="/rds.svg" alt="rds" width="64" height="64" title="Relational Database Service" />
                  <Image src="/sqs.svg" alt="sqs" width="64" height="64" title="Simple Queue Service" />
                  <Image src="/eventbridge.svg" alt="eventbridge" width="64" height="64" title="EventBridge" />
                  <Image src="/apigateway.svg" alt="apigateway" width="64" height="64" title="API Gateway" />
                  <Image src="/appsync.svg" alt="apprunner" width="64" height="64" title="AppSync" />
                  <Image src="/cloudformation.svg" alt="cloudformation" width="64" height="64" title="Cloud Formation" />
                  <Image src="/cloudwatch.svg" alt="cloudwatch" width="64" height="64" title="Cloud Watch" />
                  <Image src="/s3.svg" alt="s3" width="64" height="64" title="Simple Storage Service" />
                  <Image src="/iam.svg" alt="apprunner" width="64" height="64" title="Identity and Access Management" />
                </div>
              </div>
              <div ref={experiencesRef} id="experiences" className={styles.experiences} data-aos="fade-up" data-aos-delay="700">
                <div className={styles.hidden}>
                  <span>#</span><p>EXPERIÊNCIAS</p>
                </div>
                <CardExp href="/" time="2023-Atual" seniority="Júnior" title="Desenvolvedor back-end" company="Power2Go" brands={["Python", "Golang", "Javascript", "Django", "Docker", "AWS", "Lambda", "SAM", "CloudFormation", "S3", "Appsync", "APIGateway", "SDK", "IAM", "EventBridge", "SQS", "CloudWatch", "DynamoDB"]} description="Tenho uma sólida experiência na concepção e implementação de aplicações serverless altamente escaláveis e seguras na Amazon Web Services (AWS). Especializo-me na arquitetura de microsserviços desacoplados, destacando-me na criação, manutenção e otimização contínua desses microsserviços, com ênfase especial na implementação de padrões avançados de mensageria. Além disso, possuo expertise no deployment de serviços em Django através de contêineres Docker na infraestrutura da AWS, proporcionando soluções tecnológicas inovadoras e eficientes para ambientes de produção." />
                <CardExp href="/" time="2022-2023" seniority="Estágio" title="Desenvolvedor back-end" company="Power2Go" brands={["AWS", "Lambda", "SAM", "CloudFormation", "Appsync", "SDK", "EventBridge", "CloudWatch", "S3"]} description="Construindo experiência sólida na concepção serverless utilizando uma arquitetura de microsserviços.Criação de scripts de migração, facilitando a refatoração eficiente de microsserviços para melhorias contínuas. Além disso, sou em aprendizado na integração perfeita com os recursos da Amazon Web Services (AWS), garantindo a otimização e eficácia operacional das soluções tecnológicas aplicadas." />
              </div>

              <div ref={certifiedsRef} id='certifieds' className={styles.experiences} data-aos="fade-up" data-aos-delay="700">
                <div className={styles.hidden}>
                  <span>#</span><p>CERTIFICADOS</p>
                </div>
                <CardExp href="https://www.credly.com/badges/f8440e00-bd35-4e65-a64e-c1645889d0fb/linked_in_profile" target="_blank" time="08/2023" title="Cloud Practitioner" company="Amazon Web Service (AWS)" brands={["AWS"]} description="Compreenção de infraestrutura básica global, conceitos de faturamento, gerenciamento de contas e definição de preço, boas práticas de segurança, recursos e custos, concepção de redes e conectividade, escalabilidade." />
                <CardExp href="https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=5d9f478b44c732b4e64556ec767d8d3b&action=view" target="_blank" time="06/2023" title="Python Fundamentos" company="FIAP" brands={["Python"]} description="Conceitos fundamentais de Python. Funções, classes, orientação a objetos, métodos especiais (Dunders), compreensões de lista e dicionários, expressões lambda, operações ternárias, decoradores, tratamento de exceções, uso de módulos e pacotes." />
                <CardExp href="https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=dbc09b04ba13b0a9d5054e03a593268b&action=view" target="_blank" time="06/2023" title="Linux Fundamentos" company="FIAP" brands={["Linux"]} description="Estrutura do sistema operacional, linha de comando para manipulação de arquivos, diretórios e processos, gerenciamento de pacotes, segurança e permissões." />
              </div>


              <div ref={projectsRef} id='projects' className={styles.projects} data-aos="fade-up" data-aos-delay="700">
                <div className={styles.hidden}>
                  <span>#</span><p>PROJETOS</p>
                </div>
                <Projects />
                <Link href={"/projects"} className={styles.archives}>Veja todos os projetos <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"></path></svg></Link>
              </div>


              <footer style={{ marginTop: "5rem", textAlign: "center"}} data-aos="fade-up" data-aos-delay="700">
                <p>&copy; 2023 Weslley Araújo | Nenhum direito reservado.</p>
              </footer>
            </aside>
            {/* <Login /> */}

          </section>
        )}
      </main>
      <div>
      </div>
    </>
  );
};


// export default function Home() {
//   return (
//     <>

//     </>
//   )
// }
