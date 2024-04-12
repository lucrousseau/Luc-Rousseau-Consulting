import { useTranslation } from "next-i18next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import SEO from "../components/SEO";
import Row from "../components/Layout/Row";
import Grid from "../components/Layout/Grid";
import Container from "../components/Layout/Container";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Picture from "../components/Picture";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import Tags from "../components/Tags";
import Product from "../components/Product";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <>
      {i18n.language === "fr" ? (
        <SEO
          title="Luc Rousseau - CTO à la Demande et Spécialiste de la Création de Produits Numériques"
          description="De l'UX/UI au développement freelance,
          mes 25 ans d'expérience m'ont doté
          d'une expertise transversale que je mets
          à votre disposition."
          image="/og/image-fr.jpg"
          url="/"
        />
      ) : (
        <SEO
          title="Luc Rousseau - On-Demand CTO & Digital Product Specialist"
          description="With over 25 years of experience spanning
          UX/UI to freelance development, I offer
          cross-disciplinary expertise for your
          projects."
          image="/og/image-en.jpg"
          url="/"
        />
      )}
      <Container
        tag={"header"}
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
          "--xs-padding-top": "0rem",
          "--xs-padding-bottom": "0rem",
        }}
      >
        <Header lang={i18n.language === "en" ? "fr" : "en"} />
      </Container>
      <main>
        <Container
          align={"center"}
          halign={"center"}
          style={{ "--padding-top": 0 }}
        >
          <Row
            reverse={["md"]}
            columns={[
              {
                cols: { col: 6, lg: 0 },
                content: (
                  <Picture
                    src={"/images/luc-profil-full.jpg"}
                    width={1035}
                    height={1570}
                    alt={"Luc Rousseau"}
                    absolute={true}
                    priority={true}
                  />
                ),
              },
              {
                cols: { col: 6, lg: 12 },
                content: (
                  <Row
                    halign={"center"}
                    columns={[
                      {
                        cols: { col: 11, xl: 12, sm: 12 },
                        style: {
                          "--padding-top": "3rem",
                          "--padding-bottom": "3rem",
                          "--sm-padding-top": "0rem",
                          "--sm-padding-bottom": "0rem",
                          "--xs-padding-top": "0rem",
                          "--xs-padding-bottom": "0rem",
                        },
                        content: (
                          <>
                            <h1>Luc Rousseau</h1>
                            {i18n.language === "fr" ? (
                              <h3>
                                CTO à la Demande et Spécialiste de la Création
                                de Produits Numériques
                              </h3>
                            ) : (
                              <h3>
                                On-Demand CTO & Digital Product Specialist
                              </h3>
                            )}
                            <Row
                              halign={"center"}
                              columns={[
                                {
                                  cols: { col: 5, sm: 7 },
                                  content: (
                                    <Picture
                                      src={"/images/luc-profil-photo.jpg"}
                                      width={1003}
                                      height={1003}
                                      alt={"Luc Rousseau"}
                                      rounded={true}
                                    />
                                  ),
                                },
                              ]}
                            />
                            {i18n.language === "fr" ? (
                              <>
                                <h4>
                                  De l&apos;UX/UI au développement freelance,
                                  mes 25 ans d&apos;expérience m&apos;ont doté
                                  d&apos;une expertise transversale que je mets
                                  à votre disposition.
                                </h4>
                                <p>
                                  En tant que consultant et CTO fractionné, je
                                  guide les startups et les PME dans le
                                  développement de leur MVP (Produit Minimum
                                  Viable). Fort de mon expertise en
                                  développement web, direction artistique et
                                  expérience utilisateur, tout en respectant les
                                  contraintes de délais et de budget,
                                  j&apos;accompagne mes clients dans la création
                                  de produits qui répondent véritablement aux
                                  besoins des utilisateurs.
                                </p>
                                <p>
                                  <strong>
                                    Transformons votre vision en réalité.
                                  </strong>
                                </p>
                                <p>
                                  <Button
                                    variant={"primary"}
                                    href={
                                      "mailto:bonjour@lucrousseau.com?subject=Demande%20de%20Rendez-Vous"
                                    }
                                    label={"Planifions un entretien !"}
                                  />
                                </p>
                              </>
                            ) : (
                              <>
                                <h4>
                                  With over 25 years of experience spanning
                                  UX/UI to freelance development, I offer
                                  cross-disciplinary expertise for your
                                  projects.
                                </h4>
                                <p>
                                  As a consultant and fractional CTO, I
                                  specialize in guiding startups and SMEs in
                                  creating their MVPs (Minimum Viable Products).
                                  Utilizing my unique skills in web development,
                                  artistic direction, and user experience—while
                                  adhering to budget and timeline constraints—I
                                  help develop products that truly meet user
                                  needs.
                                </p>
                                <p>
                                  <strong>
                                    Let&apos;s Transform Your Vision into
                                    Reality.
                                  </strong>
                                </p>
                                <p>
                                  <Button
                                    variant={"primary"}
                                    href={
                                      "mailto:hello@lucrousseau.com?subject=Appointment%20Request"
                                    }
                                    label={"Schedule a Chat!"}
                                  />
                                </p>
                              </>
                            )}
                          </>
                        ),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Container>
        <Container id={t("_projects")} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{
              "--padding-bottom": "2rem",
              "--sm-padding-bottom": "2rem",
            }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <h2 className="underline underline--center">
                        Rendre le Possible Tangible
                      </h2>
                      <p className="big">
                        Je transforme les défis du développement de produits
                        numériques en opportunités claires et réalisables,
                        catalysant ainsi l&apos;innovation et assurant la
                        réussite.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="underline underline--center">
                        Making the Possible Tangible
                      </h2>
                      <p className="big">
                        I transform digital product development challenges into
                        distinct, achievable opportunities to fuel innovation
                        and ensure success.
                      </p>
                    </>
                  ),
              },
            ]}
          />
          <Row
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content: (
                  <Accordion
                    align={"left"}
                    items={[
                      {
                        title: "Nesto",
                        emoji: "🧠",
                        content:
                          i18n.language === "fr" ? (
                            <>
                              <h4>Synergie et Innovation Technique</h4>
                              <h5>
                                Définition et Mise en Place d&apos;une
                                Architecture Système Centralisée
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Conception d&apos;une Architecture Unifiée :
                                  </strong>{" "}
                                  Mise en place d&apos;une architecture système
                                  centralisée qui constitue la base de tous les
                                  projets, assurant cohérence, efficacité et
                                  facilité de maintenance à travers les
                                  différentes initiatives.
                                </li>
                                <li>
                                  <strong>Grille Adaptable :</strong> Mise en
                                  œuvre d&apos;une grille adaptable dans
                                  l&apos;architecture, offrant flexibilité et
                                  personnalisation selon les besoins spécifiques
                                  de chaque projet, tout en conservant une
                                  infrastructure technique solide et cohérente.
                                </li>
                              </ul>
                              <h5>
                                Leadership Technique et Coordination
                                d&apos;Équipe
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Direction Technique et Supervision :
                                  </strong>{" "}
                                  Fourniture de directives techniques précises
                                  et de soutien aux équipes pour garantir
                                  l&apos;alignement avec l&apos;architecture
                                  définie et l&apos;adoption des meilleures
                                  pratiques.
                                </li>
                                <li>
                                  <strong>
                                    Recrutement et Développement des Talents :
                                  </strong>{" "}
                                  Participation active au processus de
                                  recrutement, visant à embaucher des candidats
                                  hautement qualifiés qui s&apos;intègrent à la
                                  culture de l&apos;entreprise, et création de
                                  tests de compétences techniques pour évaluer
                                  efficacement les candidats.
                                </li>
                              </ul>
                              <h5>
                                Suivi, Maintenance et Évolution des Systèmes
                              </h5>
                              <ul>
                                <li>
                                  <strong>Processus de Maintenance :</strong>{" "}
                                  Établissement de procédures de suivi et de
                                  maintenance pour garantir la performance
                                  optimale des systèmes existants et leur
                                  conformité avec les avancées technologiques ou
                                  les changements de besoins.
                                </li>
                                <li>
                                  <strong>
                                    Mises à Jour et Optimisations Constantes :
                                  </strong>{" "}
                                  Analyse régulière de l&apos;efficacité de
                                  l&apos;architecture actuelle pour identifier
                                  les possibilités d&apos;amélioration.
                                </li>
                              </ul>
                              <p align="right">
                                <Button
                                  variant={"secondary"}
                                  size={"small"}
                                  href={"https://www.nesto.ca/fr/"}
                                  target={"_blank"}
                                  label={"Visiter le Site Web"}
                                />
                              </p>
                            </>
                          ) : (
                            <>
                              <h4>Synergy and Technical Innovation</h4>
                              <h5>
                                Definition and Implementation of a Centralized
                                System Architecture
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Design of a Unified Architecture:
                                  </strong>{" "}
                                  I develop a centralized system architecture
                                  that serves as the foundation for all
                                  projects, ensuring consistency, efficiency,
                                  and ease of maintenance across various
                                  initiatives.
                                </li>
                                <li>
                                  <strong>Adaptable Grid:</strong> I implement
                                  an adaptable grid within the architecture,
                                  offering flexibility and customization
                                  according to the unique requirements of each
                                  project, while preserving a solid and
                                  consistent technical infrastructure.
                                </li>
                              </ul>
                              <h5>
                                Technical Leadership and Team Coordination
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Technical Direction and Supervision:
                                  </strong>{" "}
                                  I provide precise technical guidelines and
                                  support to teams to ensure alignment with the
                                  defined architecture and adoption of best
                                  practices.
                                </li>
                                <li>
                                  <strong>
                                    Recruitment and Talent Development:
                                  </strong>{" "}
                                  I actively engage in the recruitment process,
                                  aiming to hire highly qualified candidates who
                                  align with the company culture, and I design
                                  technical skill tests to efficiently evaluate
                                  candidates.
                                </li>
                              </ul>
                              <h5>
                                Monitoring, Maintenance, and Evolution of
                                Systems
                              </h5>
                              <ul>
                                <li>
                                  <strong>Maintenance Process:</strong> I
                                  establish monitoring and maintenance
                                  procedures to ensure optimal performance of
                                  existing systems and their compliance with
                                  technological advancements or changing needs.
                                </li>
                                <li>
                                  <strong>
                                    Constant Updates and Optimization:
                                  </strong>{" "}
                                  I regularly analyze the current
                                  architecture&apos;s effectiveness to identify
                                  opportunities for improvement.
                                </li>
                              </ul>
                              <p align="right">
                                <Button
                                  variant={"secondary"}
                                  size={"small"}
                                  href={"https://www.nesto.ca"}
                                  target={"_blank"}
                                  label={"Visit the Website"}
                                />
                              </p>
                            </>
                          ),
                      },
                      {
                        title:
                          i18n.language === "fr"
                            ? "Mon Meilleur Taux"
                            : "Compare Mortgages",
                        emoji: "🧠",
                        content:
                          i18n.language === "fr" ? (
                            <>
                              <h4>
                                Architecture, Innovation et Optimisation pour
                                l&apos;Utilisateur
                              </h4>
                              <h5>
                                Planification Stratégique et Architecture du
                                Système
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Conception d&apos;une Structure Système
                                    Optimale :
                                  </strong>{" "}
                                  Établissement d&apos;une architecture qui
                                  soutient efficacement l&apos;analyse et la
                                  comparaison des prêts hypothécaires, assurant
                                  ainsi un support optimal.
                                </li>
                                <li>
                                  <strong>
                                    Planification Précise du Projet :
                                  </strong>{" "}
                                  Définition des étapes clés et des livrables
                                  pour structurer le développement et assurer
                                  une livraison dans les délais.
                                </li>
                              </ul>
                              <h5>Leadership et Coordination d&apos;Équipe</h5>
                              <ul>
                                <li>
                                  <strong>
                                    Alignement des Étapes de Conception et de
                                    Développement :
                                  </strong>{" "}
                                  Coordination efficace entre la création de
                                  maquettes fonctionnelles, le design et les
                                  développeurs back-end et front-end.
                                </li>
                                <li>
                                  <strong>
                                    Planification et Intégration des Phases :
                                  </strong>{" "}
                                  Définition précise des priorités et des
                                  échéances pour chaque phase, garantissant une
                                  progression fluide vers la livraison finale,
                                  tout en préservant une haute qualité et une
                                  expérience utilisateur optimale.
                                </li>
                              </ul>
                              <h5>
                                Expérience Utilisateur et Analyse des Résultats
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Développement de l&apos;Interface
                                    Utilisateur :
                                  </strong>{" "}
                                  Travail en étroite collaboration avec les
                                  designers pour créer des prototypes et des
                                  maquettes répondant aux attentes des
                                  utilisateurs.
                                </li>
                                <li>
                                  <strong>
                                    Création et Intégration d&apos;Outils
                                    Efficaces :
                                  </strong>{" "}
                                  Développement et intégration d&apos;outils
                                  avancés destinés aux tests A/B et à
                                  l&apos;analyse détaillée des données.
                                </li>
                              </ul>
                              <p align="right">
                                <Button
                                  variant={"secondary"}
                                  size={"small"}
                                  href={
                                    "https://monmeilleurtaux.ca/quotes/nouvel-achat/"
                                  }
                                  target={"_blank"}
                                  label={"Visiter le Site Web"}
                                />
                              </p>
                            </>
                          ) : (
                            <>
                              <h4>
                                Architecture, Innovation, and User Optimization
                              </h4>
                              <h5>
                                Strategic Planning and System Architecture
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Designing an Optimal System Structure:
                                  </strong>{" "}
                                  I establish an architecture that effectively
                                  supports the analysis and comparison of
                                  mortgage loans, thus ensuring optimal support.
                                </li>
                                <li>
                                  <strong>Detailed Project Planning:</strong> I
                                  define key stages and deliverables to
                                  structure the development and ensure timely
                                  delivery.
                                </li>
                              </ul>
                              <h5>Team Leadership and Coordination</h5>
                              <ul>
                                <li>
                                  <strong>
                                    Aligning Design to Development Stages:
                                  </strong>{" "}
                                  I effectively coordinate between the creation
                                  of functional mockups, design, as well as
                                  back-end and front-end developers.
                                </li>
                                <li>
                                  <strong>
                                    Planning and Integrating Phases:
                                  </strong>{" "}
                                  I clearly define priorities and timelines for
                                  each phase, ensuring a smooth progression
                                  towards the final delivery while maintaining
                                  high quality and an optimal user experience.
                                </li>
                              </ul>
                              <h5>User Experience and Result Analysis</h5>
                              <ul>
                                <li>
                                  <strong>User Interface Development:</strong> I
                                  work closely with designers to create
                                  prototypes and mockups that meet user
                                  expectations.
                                </li>
                                <li>
                                  <strong>
                                    Creation and Integration of Efficient Tools:
                                  </strong>{" "}
                                  I develop and integrate advanced tools
                                  dedicated to A/B testing and in-depth data
                                  analysis.
                                </li>
                              </ul>
                              <p align="right">
                                <Button
                                  variant={"secondary"}
                                  size={"small"}
                                  href={
                                    "https://comparemortgages.ca/quotes/purchase/"
                                  }
                                  target={"_blank"}
                                  label={"Visit the Website"}
                                />
                              </p>
                            </>
                          ),
                      },
                      {
                        title: "BrightWize",
                        emoji: "🧠",
                        content:
                          i18n.language === "fr" ? (
                            <>
                              <h4>
                                IInnovation, Planification et Supervision
                                Technique
                              </h4>
                              <h5>Évaluation et Planification du Projet</h5>
                              <ul>
                                <li>
                                  <strong>Analyse de Faisabilité :</strong>{" "}
                                  Évaluation complète des délais, des ressources
                                  nécessaires et de la viabilité du projet.
                                </li>
                                <li>
                                  <strong>Stratégie de Développement :</strong>{" "}
                                  Élaboration d&apos;une stratégie détaillée
                                  pour diriger l&apos;exécution du projet,
                                  incluant la définition des phases de travail.
                                </li>
                              </ul>
                              <h5>
                                Conception Architecturale et Technologique
                              </h5>
                              <ul>
                                <li>
                                  <strong>
                                    Sélection d&apos;Architecture et de
                                    Technologie :
                                  </strong>{" "}
                                  Conception de l&apos;architecture du projet et
                                  choix des technologies et outils appropriés
                                  pour assurer un développement efficace et
                                  adaptable.
                                </li>
                                <li>
                                  <strong>Prérequis Techniques :</strong>{" "}
                                  Définition des exigences techniques pour
                                  assurer une base solide pour le déploiement et
                                  la croissance future du projet.
                                </li>
                              </ul>
                              <h5>Supervision Technique et Support Continu</h5>
                              <ul>
                                <li>
                                  <strong>
                                    Suivi des Progrès et Résolution de Problèmes
                                    :
                                  </strong>{" "}
                                  Surveillance régulière de l&apos;avancement du
                                  développement, en portant une attention
                                  particulière à la résolution proactive des
                                  défis techniques.
                                </li>
                                <li>
                                  <strong>Assurance de la Conformité :</strong>{" "}
                                  Veiller à ce que les développements soient
                                  conformes à la vision initiale du projet et
                                  répondent à des normes de qualité élevées.
                                </li>
                              </ul>
                            </>
                          ) : (
                            <>
                              <h4>
                                Innovation, Planning, and Technical Oversight
                              </h4>
                              <h5>Project Evaluation and Planning</h5>
                              <ul>
                                <li>
                                  <strong>Feasibility Analysis:</strong> I
                                  comprehensively evaluate timelines, required
                                  resources, and the overall viability of the
                                  project.
                                </li>
                                <li>
                                  <strong>Development Strategy:</strong> I
                                  develop a detailed strategy to guide the
                                  project&apos;s execution, including the
                                  definition of work phases.
                                </li>
                              </ul>
                              <h5>Architectural and Technological Design</h5>
                              <ul>
                                <li>
                                  <strong>
                                    Architecture and Technology Selection:
                                  </strong>{" "}
                                  I design a project architecture and select
                                  appropriate technologies and tools to ensure
                                  effective and adaptable development.
                                </li>
                                <li>
                                  <strong>Technical Prerequisites:</strong> I
                                  define technical requirements to ensure a
                                  solid foundation for the deployment and future
                                  growth of the project.
                                </li>
                              </ul>
                              <h5>Ongoing Technical Supervision and Support</h5>
                              <ul>
                                <li>
                                  <strong>
                                    Progress Monitoring and Problem Solving:
                                  </strong>{" "}
                                  I regularly monitor development progress,
                                  paying particular attention to the proactive
                                  resolution of technical challenges.
                                </li>
                                <li>
                                  <strong>Compliance Assurance:</strong> I
                                  ensure that developments are aligned with the
                                  initial project vision and meet high quality
                                  standards.
                                </li>
                              </ul>
                            </>
                          ),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
          <Row
            style={{
              "--padding-top": "2rem",
              "--sm-padding-top": "2rem",
            }}
            columns={[
              {
                content:
                  i18n.language === "fr" ? (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:bonjour@lucrousseau.com?subject=Demande%20de%20Rendez-Vous"
                        }
                        label={"Innovons dès maintenant !"}
                      />
                    </p>
                  ) : (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:hello@lucrousseau.com?subject=Appointment%20Request"
                        }
                        label={"Start Innovating Now!"}
                      />
                    </p>
                  ),
              },
            ]}
          />
        </Container>
        <Container
          id={t("_why")}
          align={"center"}
          halign={"center"}
          background={{
            src: "/images/rome-1.jpg",
            alt: "Rome",
            width: 2528,
            height: 1264,
          }}
        >
          <Row
            halign={"center"}
            style={{
              "--padding-bottom": "2rem",
              "--sm-padding-bottom": "0rem",
            }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <h2 className="underline underline--center">
                        Pourquoi Opter pour un CTO à la Demande
                      </h2>
                      <p className="big">
                        Choisir un CTO à la demande, c&apos;est sécuriser un
                        partenaire qui comprend votre vision et apporte une
                        expertise technique personnalisée pour guider
                        l&apos;innovation et optimiser le développement à chaque
                        étape.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="underline underline--center">
                        Why Opt for an On-Demand CTO
                      </h2>
                      <p className="big">
                        Choosing an on-demand CTO means securing a partner who
                        understands your vision and provides tailored technical
                        expertise to guide innovation and optimize development
                        at every stage.
                      </p>
                    </>
                  ),
              },
            ]}
          />
          <Row
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <ol className="align--center">
                        <li className="h3">
                          Prévention des erreurs coûteuses, contribution à la
                          réduction des risques et sécurisation de votre projet.
                        </li>
                        <li className="h3">
                          Garantie d&apos;excellence technique et de cohérence à
                          chaque étape du développement.
                        </li>
                        <li className="h3">
                          Leadership sur mesure pour constituer une équipe
                          performante et sélectionner les technologies
                          adéquates.
                        </li>
                        <li className="h3">
                          Un rôle clé dans le succès de vos ambitions
                          numériques.
                        </li>
                        <li className="h3">
                          Une combinaison d&apos;expertise technique et de
                          compétences managériales.
                        </li>
                        <li className="h3">
                          Une veille constante sur les tendances pour vous
                          maintenir à l&apos;avant-garde.
                        </li>
                      </ol>
                      <Row
                        style={{
                          "--padding-top": "2rem",
                          "--sm-padding-top": "2rem",
                        }}
                        columns={[
                          {
                            content: (
                              <p>
                                <Button
                                  variant={"primary"}
                                  href={
                                    "mailto:bonjour@lucrousseau.com?subject=Demande%20de%20Rendez-Vous"
                                  }
                                  label={"Sécuriser votre expert !"}
                                />
                              </p>
                            ),
                          },
                        ]}
                      />
                    </>
                  ) : (
                    <>
                      <ol className="align--center">
                        <li className="h3">
                          Prevents costly mistakes, contributes to risk
                          reduction, and secures your project.
                        </li>
                        <li className="h3">
                          Ensures technical excellence and consistency at every
                          development stage.
                        </li>
                        <li className="h3">
                          Provides tailored leadership for building a
                          high-performing team and selecting technologies.
                        </li>
                        <li className="h3">
                          Plays a central role in the success of your digital
                          ambitions.
                        </li>
                        <li className="h3">
                          Combines technical expertise and managerial skills.
                        </li>
                        <li className="h3">
                          Constantly monitors trends to keep you at the
                          forefront.
                        </li>
                      </ol>
                      <Row
                        style={{
                          "--padding-top": "2rem",
                          "--sm-padding-top": "2rem",
                        }}
                        columns={[
                          {
                            content: (
                              <p>
                                <Button
                                  variant={"primary"}
                                  href={
                                    "mailto:hello@lucrousseau.com?subject=Appointment%20Request"
                                  }
                                  label={"Secure Expert Guidance!"}
                                />
                              </p>
                            ),
                          },
                        ]}
                      />
                    </>
                  ),
              },
            ]}
          />
        </Container>
        <Container id={t("_services")} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{ "--padding-bottom": "2rem" }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <h2 className="underline underline--center">
                        Mon Offre de Services CTO à la Demande
                      </h2>
                      <p className="big">
                        Je vous apporte une expertise technique assortie
                        d&apos;une vision stratégique pour garantir
                        l&apos;intégration technologique et l&apos;adaptabilité
                        de votre projet face aux défis actuels et futurs.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="underline underline--center">
                        My On-Demand CTO Service Offering
                      </h2>
                      <p className="big">
                        I bring you technical expertise coupled with a strategic
                        vision to ensure the technological integration and
                        adaptability of your project to current and future
                        challenges.
                      </p>
                    </>
                  ),
              },
            ]}
          />
          <Row
            columns={[
              {
                cols: { col: 4, lg: 10, sm: 12 },
                content: (
                  <Product
                    title={
                      i18n.language === "fr"
                        ? "Séance Diagnostique"
                        : "Diagnostic Session"
                    }
                    label={
                      i18n.language === "fr"
                        ? "Réservez votre séance!"
                        : "Book Your Session Now!"
                    }
                    className={"align--lg-left"}
                  >
                    {i18n.language === "fr" ? (
                      <>
                        <p>
                          Une heure de consultation stratégique pour examiner
                          vos défis technologiques et identifier les
                          opportunités.
                        </p>
                        <ul className="small align--left">
                          <li>
                            Analyse des défis et opportunités technologiques.
                          </li>
                          <li>
                            Conseils fondés sur les meilleures pratiques de
                            développement et les tendances actuelles.
                          </li>
                          <li>
                            Discussion sur l&apos;état de votre stratégie
                            technologique et analyse des risques.
                          </li>
                          <li>
                            Recommandations pour améliorer l&apos;UX/UI en lien
                            avec vos processus de développement.
                          </li>
                          <li>Propositions pour les prochaines étapes.</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          One hour of strategic consultation to review your
                          technological challenges and identify opportunities.
                        </p>
                        <ul className="small align--left">
                          <li>
                            Analysis of technological challenges and
                            opportunities.
                          </li>
                          <li>
                            Advice based on best development practices and
                            current trends.
                          </li>
                          <li>
                            Discussion on the state of your technological
                            strategy and risk analysis.
                          </li>
                          <li>
                            Guidance to improve UX/UI in relation to your
                            development processes.
                          </li>
                          <li>Recommendations for next steps.</li>
                        </ul>
                      </>
                    )}
                  </Product>
                ),
              },
              {
                cols: { col: 4, lg: 10, sm: 12 },
                content: (
                  <Product
                    title={
                      i18n.language === "fr"
                        ? "Énoncé des travaux"
                        : "Scope of Work (SOW)"
                    }
                    label={
                      i18n.language === "fr"
                        ? "Réservez votre séance!"
                        : "Book Your Session Now!"
                    }
                    className={"align--lg-left"}
                  >
                    {i18n.language === "fr" ? (
                      <>
                        <p>
                          Un plan d&apos;action personnalisé pour concrétiser
                          votre vision, comprenant un cahier des charges
                          détaillé et une feuille de route.
                        </p>
                        <ul className="small align--left">
                          <li>Séance diagnostique incluse.</li>
                          <li>
                            Élaboration d&apos;un plan d&apos;intervention sur
                            mesure.
                          </li>
                          <li>Stratégie d&apos;évolution du produit.</li>
                          <li>Analyse des technologies appropriées.</li>
                          <li>Planification des ressources et du budget.</li>
                          <li>
                            Définition d&apos;un calendrier de développement.
                          </li>
                          <li>
                            Coordination des plateformes et outils
                            technologiques.
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          A tailored action plan to realize your vision,
                          including a detailed specification book and a roadmap.
                        </p>
                        <ul className="small align--left">
                          <li>Diagnostic Session included.</li>
                          <li>
                            Development of a personalized intervention plan.
                          </li>
                          <li>Product evolution strategy.</li>
                          <li>Analysis of suitable technologies.</li>
                          <li>Planning of resources and budget.</li>
                          <li>Definition of a development schedule.</li>
                          <li>
                            Coordination of platforms and technological tools.
                          </li>
                        </ul>
                      </>
                    )}
                  </Product>
                ),
              },

              {
                cols: { col: 4, lg: 10, sm: 12 },
                content: (
                  <Product
                    title={
                      i18n.language === "fr"
                        ? "Partenariat à Long Terme"
                        : "Long-Term Partnership"
                    }
                    label={
                      i18n.language === "fr"
                        ? "Réservez votre séance!"
                        : "Book Your Session Now!"
                    }
                    className={"align--lg-left"}
                  >
                    {i18n.language === "fr" ? (
                      <>
                        <p>
                          Un engagement profond et continu pour garantir la
                          qualité et l&apos;évolution de votre projet.
                        </p>
                        <ul className="small align--left">
                          <li>
                            Inclut la séance diagnostique et la planification
                            stratégique.
                          </li>
                          <li>
                            Gestion proactive et suivi régulier du développement
                            et des partenaires technologiques.
                          </li>
                          <li>
                            Ajustements stratégiques et assurance qualité
                            continue.
                          </li>
                          <li>
                            Veille technologique et conseils sur les nouvelles
                            tendances.
                          </li>
                          <li>Service de développement web.</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          A deep and constant commitment to ensuring the quality
                          and evolution of your project.
                        </p>
                        <ul className="small align--left">
                          <li>
                            Includes the Diagnostic Session and Strategic
                            Planning.
                          </li>
                          <li>
                            Proactive management and regular monitoring of
                            development and technological partners.
                          </li>
                          <li>
                            Strategic adjustments and continuous quality
                            assurance.
                          </li>
                          <li>
                            Technological surveillance and advice on new trends.
                          </li>
                          <li>Web development service.</li>
                        </ul>
                      </>
                    )}
                  </Product>
                ),
              },
            ]}
          />
        </Container>
        <Container id={t("_development")} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{
              "--padding-bottom": "2rem",
              "--sm-padding-bottom": "2rem",
            }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <h2 className="underline underline--center">
                        Les Langages et Technologies que Je Maîtrise
                      </h2>
                      <p className="big">
                        Mon expertise s&apos;étend du design au développement et
                        à la gestion de projet, transformant les idées en
                        solutions numériques clés.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="underline underline--center">
                        The Languages and Technologies I Master
                      </h2>
                      <p className="big">
                        My expertise spans design, development, and project
                        management, transforming ideas into key digital
                        solutions.
                      </p>
                    </>
                  ),
              },
            ]}
          />
          <Row
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content: (
                  <Tags
                    halign={"center"}
                    items={
                      i18n.language === "fr"
                        ? [
                            { content: "Leadership", emoji: "⭐️" },
                            { content: "React", emoji: "⭐️" },
                            { content: "Vue.js", emoji: "⭐️" },
                            { content: "PHP", emoji: "⭐️" },
                            { content: "Webpack", emoji: "⭐️" },
                            { content: "Conception", emoji: "⭐️" },
                            { content: "ChatGPT", emoji: "⭐️" },
                            { content: "Évaluation", emoji: "⭐️" },
                            { content: "Copilot", emoji: "⭐️" },
                            { content: "WordPress", emoji: "⭐️" },
                            { content: "GraphQL", emoji: "⭐️" },
                            { content: "API REST", emoji: "⭐️" },
                            { content: "GIT", emoji: "⭐️" },
                            { content: "Laravel", emoji: "⭐️" },
                            { content: "Agile", emoji: "⭐️" },
                            { content: "BEM", emoji: "⭐️" },
                            { content: "SCSS", emoji: "⭐️" },
                            { content: "Planification", emoji: "⭐️" },
                            { content: "Docker", emoji: "⭐️" },
                            { content: "Tailwind", emoji: "⭐️" },
                            { content: "Budgétisation", emoji: "⭐️" },
                            { content: "Next.js", emoji: "⭐️" },
                            { content: "Figma", emoji: "⭐️" },
                          ]
                        : [
                            { content: "Leadership", emoji: "⭐️" },
                            { content: "React", emoji: "⭐️" },
                            { content: "Vue.js", emoji: "⭐️" },
                            { content: "PHP", emoji: "⭐️" },
                            { content: "Webpack", emoji: "⭐️" },
                            { content: "Design", emoji: "⭐️" },
                            { content: "ChatGPT", emoji: "⭐️" },
                            { content: "Evaluation", emoji: "⭐️" },
                            { content: "Copilot", emoji: "⭐️" },
                            { content: "WordPress", emoji: "⭐️" },
                            { content: "GraphQL", emoji: "⭐️" },
                            { content: "REST API", emoji: "⭐️" },
                            { content: "GIT", emoji: "⭐️" },
                            { content: "Laravel", emoji: "⭐️" },
                            { content: "Agile", emoji: "⭐️" },
                            { content: "BEM", emoji: "⭐️" },
                            { content: "SCSS", emoji: "⭐️" },
                            { content: "Planning", emoji: "⭐️" },
                            { content: "Docker", emoji: "⭐️" },
                            { content: "Tailwind", emoji: "⭐️" },
                            { content: "Budgeting", emoji: "⭐️" },
                            { content: "Next.js", emoji: "⭐️" },
                            { content: "Figma", emoji: "⭐️" },
                          ]
                    }
                  />
                ),
              },
            ]}
          />
          <Row
            style={{
              "--padding-top": "2rem",
              "--sm-padding-top": "2rem",
            }}
            columns={[
              {
                content:
                  i18n.language === "fr" ? (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:bonjour@lucrousseau.com?subject=Demande%20de%20Rendez-Vous"
                        }
                        label={"Discutons technologies !"}
                      />
                    </p>
                  ) : (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:hello@lucrousseau.com?subject=Appointment%20Request"
                        }
                        label={"Discuss Your Tech Needs!"}
                      />
                    </p>
                  ),
              },
            ]}
          />
        </Container>
        <Container id={t("_advantage")} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{ "--padding-bottom": "2rem" }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <h2 className="underline underline--center">
                        Les Avantages de Mon Service
                      </h2>
                      <p className="big">
                        Je mets à disposition mon expertise technique et ma
                        vision stratégique, stimulant l&apos;innovation et
                        optimisant le développement lors des moments clés de
                        chaque projet.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="underline underline--center">
                        The Benefits of My Service Offering
                      </h2>
                      <p className="big">
                        I provide my technical expertise and strategic vision,
                        stimulating innovation and optimizing development at
                        critical moments of each project.
                      </p>
                    </>
                  ),
              },
            ]}
          />
          <Row
            align={"left"}
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content: (
                  <Accordion
                    align={"left"}
                    items={
                      i18n.language === "fr"
                        ? [
                            {
                              title: "Expertise en résolution de problèmes",
                              emoji: "🔓",
                              content: (
                                <p>
                                  Je propose des solutions innovantes et
                                  personnalisées pour relever vos défis, fort de
                                  mon expérience diversifiée.
                                </p>
                              ),
                            },
                            {
                              title: "Focus sur l'expérience utilisateur",
                              emoji: "👥",
                              content: (
                                <p>
                                  Je veille constamment à aligner les efforts de
                                  l&apos;équipe sur les besoins de vos
                                  utilisateurs, garantissant leur satisfaction.
                                </p>
                              ),
                            },
                            {
                              title: "Prise de décisions basée sur les données",
                              emoji: "💬",
                              content: (
                                <p>
                                  J&apos;adopte une approche analytique pour
                                  transformer vos idées en insights
                                  exploitables.
                                </p>
                              ),
                            },
                            {
                              title: "Agilité et adaptabilité",
                              emoji: "🔄",
                              content: (
                                <p>
                                  J&apos;utilise des méthodes agiles pour rester
                                  flexible et réactif, assurant une livraison
                                  régulière et efficace.
                                </p>
                              ),
                            },
                            {
                              title: "Optimisation de la productivité",
                              emoji: "⏩",
                              content: (
                                <p>
                                  Je crée un environnement de travail dynamique,
                                  maximisant la productivité et le bien-être de
                                  vos équipes.
                                </p>
                              ),
                            },
                            {
                              title:
                                "Compétences en codage et solutions sans code",
                              emoji: "💻",
                              content: (
                                <p>
                                  Je combine le codage traditionnel et les
                                  solutions sans code pour une efficacité
                                  maximale, adaptée à vos besoins.
                                </p>
                              ),
                            },
                            {
                              title: "Intelligence artificielle générative",
                              emoji: "🤖",
                              content: (
                                <p>
                                  Je vous guide dans l&apos;exploration des
                                  possibilités offertes par l&apos;intelligence
                                  artificielle générative pour maximiser votre
                                  potentiel d&apos;innovation.
                                </p>
                              ),
                            },
                          ]
                        : [
                            {
                              title: "Problem-Solving Expertise",
                              emoji: "🔓",
                              content: (
                                <p>
                                  I find innovative and custom solutions for
                                  your challenges, backed by my diverse
                                  experience.
                                </p>
                              ),
                            },
                            {
                              title: "User Experience Focus",
                              emoji: "👥",
                              content: (
                                <p>
                                  I consistently evaluate whether the
                                  team&apos;s efforts align with your
                                  users&apos; needs, ensuring their
                                  satisfaction.
                                </p>
                              ),
                            },
                            {
                              title: "Data-Driven Decisions",
                              emoji: "💬",
                              content: (
                                <p>
                                  I adopt an analytical approach, turning your
                                  ideas into actionable insights.
                                </p>
                              ),
                            },
                            {
                              title: "Agility and Adaptability",
                              emoji: "🔄",
                              content: (
                                <p>
                                  I use agile methods to stay flexible and
                                  adaptable, ensuring regular and efficient
                                  delivery.
                                </p>
                              ),
                            },
                            {
                              title: "Productivity Optimization",
                              emoji: "⏩",
                              content: (
                                <p>
                                  I create a dynamic work environment,
                                  maximizing productivity and your team&apos;s
                                  well-being.
                                </p>
                              ),
                            },
                            {
                              title:
                                "Expertise in Coding and No-Code Solutions",
                              emoji: "💻",
                              content: (
                                <p>
                                  I combine traditional coding and No-Code
                                  solutions for maximum efficiency tailored to
                                  your needs.
                                </p>
                              ),
                            },
                            {
                              title: "Generative Artificial Intelligence",
                              emoji: "🤖",
                              content: (
                                <p>
                                  I guide the exploration of generative
                                  artificial intelligence horizons to maximize
                                  your innovative potential.
                                </p>
                              ),
                            },
                          ]
                    }
                  />
                ),
              },
            ]}
          />
          <Row
            style={{ "--padding-top": "2rem", "--sm-padding-top": "2rem" }}
            columns={[
              {
                content:
                  i18n.language === "fr" ? (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:bonjour@lucrousseau.com?subject=Demande%20de%20Rendez-Vous"
                        }
                        label={"Maximiser votre potentiel !"}
                      />
                    </p>
                  ) : (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:hello@lucrousseau.com?subject=Appointment%20Request"
                        }
                        label={"Maximize Your Project's Potential!"}
                      />
                    </p>
                  ),
              },
            ]}
          />
        </Container>
        <Container align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{
              "--padding-bottom": "2rem",
              "--sm-padding-bottom": "2rem",
            }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content:
                  i18n.language === "fr" ? (
                    <>
                      <h2 className="underline underline--center">
                        Au-delà du bureau : passion, voyage et photographie
                      </h2>
                      <p className="big">
                        La vie ne se résume pas au travail. Je trouve mon
                        évasion à travers les voyages et la photographie,
                        capturant le monde avec mon objectif et partageant les
                        passions qui m&apos;inspirent au quotidien.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="underline underline--center">
                        Beyond the Desk: Passion, Travel, and Photography
                      </h2>
                      <p className="big">
                        Because life is not just about work, I escape through
                        travel and capture the world through my lens, sharing my
                        passions that inspire me daily.
                      </p>
                    </>
                  ),
              },
            ]}
          />
          <Grid
            className="grid"
            style={{ aspectRatio: "16/10" }}
            template={[
              {
                cols: { col: 6 },
                rows: { row: 12 },
                content: (
                  <Picture
                    src={"/images/clearwater-falls.jpg"}
                    width={1527}
                    height={2048}
                    alt={"Clearwater Falls"}
                    absolute={true}
                  />
                ),
              },
              {
                cols: { col: 6 },
                rows: { row: 6 },
                content: (
                  <Picture
                    src={"/images/grand-teton-mouton-barn.jpg"}
                    width={2048}
                    height={1365}
                    alt={"Grand Teton"}
                    absolute={true}
                  />
                ),
              },
              {
                cols: { col: 6 },
                rows: { row: 6 },
                content: (
                  <Picture
                    src={"/images/portland-lighthouse.jpg"}
                    width={2048}
                    height={1365}
                    alt={"Portland"}
                    absolute={true}
                  />
                ),
              },
            ]}
          />
          <Row
            style={{ "--padding-top": "2rem", "--sm-padding-top": "2rem" }}
            columns={[
              {
                content:
                  i18n.language === "fr" ? (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:bonjour@lucrousseau.com?subject=Demande%20de%20Rendez-Vous"
                        }
                        label={"Contactez-moi !"}
                      />
                    </p>
                  ) : (
                    <p>
                      <Button
                        variant={"primary"}
                        href={
                          "mailto:hello@lucrousseau.com?subject=Appointment%20Request"
                        }
                        label={"Contact Me for Unique Insights!"}
                      />
                    </p>
                  ),
              },
            ]}
          />
        </Container>
      </main>
      <Container
        tag={"footer"}
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Footer />
      </Container>
      <SpeedInsights />;
      <Analytics />
    </>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
