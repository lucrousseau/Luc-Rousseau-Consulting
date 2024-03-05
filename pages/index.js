import Head from "next/head";

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

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Luc Rousseau - CTO à la Demande et Création de Produits Numériques
        </title>
        <meta
          name="description"
          content="Luc Rousseau - CTO à la Demande et Création de Produits Numériques. Expertise en développement web, direction artistique et expérience utilisateur."
        />
        <meta
          property="og:title"
          content="Luc Rousseau - CTO à la Demande et Création de Produits Numériques"
        />
        <meta
          property="og:description"
          content="Expertise en développement web, direction artistique et expérience utilisateur."
        />
        <meta
          property="og:image"
          content="https://lucrousseau.com/og//facebook.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Luc Rousseau - CTO à la Demande et Création de Produits Numériques"
        />
        <meta
          name="twitter:description"
          content="Expertise en développement web, direction artistique et expérience utilisateur."
        />
        <meta
          name="twitter:image"
          content="https://lucrousseau.com/og//twitter.jpg"
        />
        <link rel="canonical" href="https://lucrousseau.com" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://lucrousseau.com/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://lucrousseau.com/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://lucrousseau.com/favicon/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="https://lucrousseau.com/favicon/site.webmanifest"
        />
      </Head>
      <Container
        tag={"header"}
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Header />
      </Container>
      <main>
        <Container
          id={"aboutme"}
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
                        },
                        content: (
                          <>
                            <h1>Luc Rousseau</h1>
                            <h3>
                              CTO à la Demande et Création de
                              Produits Numériques
                            </h3>
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
                            <h4>
                              De l&apos;UX/UI au développement indépendant, mes
                              25 ans d&apos;expérience m&apos;ont conféré une
                              expertise transversale que je mets à votre
                              service.
                            </h4>
                            <p>
                              Aujourd&apos;hui, en tant que consultant et CTO à
                              la demande, <strong>je guide les startups</strong>{" "}
                              et les PME dans le{" "}
                              <em>développement de leur MVP</em> (produit
                              minimum viable). Fort de mon expertise unique en
                              développement web, direction artistique et
                              expérience utilisateur , et tout en respectant les
                              échéanciers et les contraintes budgétaires,
                              j&apos;aide mes clients à créer des produits
                              viables, parfaitement alignés sur les besoins des
                              utilisateurs.
                            </p>
                            <p>
                              <Button
                                variant={"primary"}
                                href={"#"}
                                label={
                                  "Contactez-moi pour discuter de votre projet"
                                }
                              />
                            </p>
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
        <Container id={"projects"} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{
              "--padding-bottom": "2rem",
              "--sm-padding-bottom": "2rem",
            }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Rendre le Possible Concret
                    </h2>
                    <p className="big">
                      Je convertis les défis du développement de produits
                      numériques en opportunités claires et réalisables,
                      catalysant ainsi l&apos;innovation et la réussite.
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
                        content: (
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
                                Élaboration d&apos;une architecture système
                                centralisée qui sert de fondation à tous les
                                projets, garantissant cohérence, efficacité, et
                                facilité de maintenance à travers les
                                différentes initiatives.
                              </li>
                              <li>
                                <strong>Grille Adaptable :</strong>{" "}
                                Implémentation d&apos;une grille adaptable au
                                sein de l&apos;architecture, offrant une
                                flexibilité et une personnalisation selon les
                                exigences uniques de chaque projet, tout en
                                préservant une infrastructure technique solide
                                et cohérente.
                              </li>
                            </ul>
                            <h5>
                              Leadership Technique et Coordination des Équipes
                            </h5>
                            <ul>
                              <li>
                                <strong>
                                  Orientation Technique et Encadrement :
                                </strong>{" "}
                                Apport de directives techniques précises et
                                d&apos;un soutien aux équipes pour
                                s&apos;assurer de l&apos;alignement avec
                                l&apos;architecture définie et l&apos;adoption
                                des meilleures pratiques.
                              </li>
                              <li>
                                <strong>
                                  Recrutement et Développement des Talents :
                                </strong>{" "}
                                Engagement actif dans le processus de sélection,
                                visant à recruter des candidats hautement
                                qualifiés qui s&apos;harmonisent avec la culture
                                de l&apos;entreprise, et conception de tests de
                                compétences techniques pour évaluer efficacement
                                les candidats.
                              </li>
                            </ul>
                            <h5>
                              Suivi, Maintenance et Évolution des Systèmes
                            </h5>
                            <ul>
                              <li>
                                <strong>Processus de Maintenance :</strong> Mise
                                en place de procédures de suivi et de
                                maintenance pour assurer la performance optimale
                                des systèmes existants et leur conformité avec
                                les avancées technologiques ou les changements
                                de besoins.
                              </li>
                              <li>
                                <strong>
                                  Mise à Jour et Optimisation Constantes :
                                </strong>{" "}
                                Analyse régulière de l&apos;efficacité de
                                l&apos;architecture actuelle pour identifier les
                                opportunités d&apos;amélioration.
                              </li>
                            </ul>
                            <p align="right">
                              <Button
                                variant={"secondary"}
                                size={"small"}
                                href={"https://www.nesto.ca"}
                                target={"_blank"}
                                label={"Visiter le Site Web"}
                              />
                            </p>
                          </>
                        ),
                      },
                      {
                        title: "Compare Mortgages",
                        emoji: "🧠",
                        content: (
                          <>
                            <h4>
                              Architecture, Innovation et Optimisation
                              Utilisateur
                            </h4>
                            <h5>
                              Planification Stratégique et Architecture Système
                            </h5>
                            <ul>
                              <li>
                                <strong>
                                  Conception d&apos;une Structure Système
                                  Optimale :
                                </strong>{" "}
                                Établir une architecture soutenant efficacement
                                l&apos;analyse et la comparaison de prêts
                                hypothécaires, assurant ainsi un support
                                optimal.
                              </li>
                              <li>
                                <strong>
                                  Planification Détailée du Projet :
                                </strong>{" "}
                                Définition des étapes clés et des livrables pour
                                structurer le développement et garantir une
                                livraison ponctuelle.
                              </li>
                            </ul>
                            <h5>Leadership d&apos;Équipe et Coordination</h5>
                            <ul>
                              <li>
                                <strong>
                                  Harmonisation des Étapes de Conception à
                                  Développement :
                                </strong>{" "}
                                Coordination efficace entre la création des
                                maquettes fonctionnelles, le design, ainsi que
                                les développeurs “back-end” et “front-end”.
                              </li>
                              <li>
                                <strong>
                                  Planification et Intégration des Phases :
                                </strong>{" "}
                                Définition claire des priorités et des délais
                                pour chaque étape, garantissant une progression
                                sans heurts vers la livraison finale, tout en
                                maintenant une haute qualité et une expérience
                                utilisateur optimale.
                              </li>
                            </ul>
                            <h5>
                              Expérience Utilisateur et Analyse des Résultats
                            </h5>
                            <ul>
                              <li>
                                <strong>
                                  Développement de l&apos;Interface Utilisateur
                                  :
                                </strong>{" "}
                                Collaboration étroite avec les designers pour
                                créer des prototypes et des maquettes qui
                                répondent aux attentes des utilisateurs.
                              </li>
                              <li>
                                <strong>
                                  Création et Intégration d&apos;Outils
                                  Performants :
                                </strong>{" "}
                                Développement et intégration d&apos;outils
                                avancés dédiés aux tests A/B et à l&apos;analyse
                                approfondie des données.
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
                                label={"Visiter le Site Web"}
                              />
                            </p>
                          </>
                        ),
                      },
                      {
                        title: "BrightWize",
                        emoji: "🧠",
                        content: (
                          <>
                            <h4>
                              Innovation, Planification et Supervision Technique
                            </h4>
                            <h5>Évaluation et Planification de Projet</h5>
                            <ul>
                              <li>
                                <strong>Analyse de Faisabilité :</strong>{" "}
                                Évaluation complète des délais, des ressources
                                nécessaires et de la viabilité globale du
                                projet.
                              </li>
                              <li>
                                <strong>Stratégie de Développement :</strong>{" "}
                                Développement d&apos;une stratégie détaillée
                                pour guider la réalisation du projet, y compris
                                la définition des phases de travail.
                              </li>
                            </ul>
                            <h5>Conception Architecturale et Technologique</h5>
                            <ul>
                              <li>
                                <strong>
                                  Architecture et Sélection Technologique :
                                </strong>{" "}
                                Création d&apos;une architecture de projet et
                                choix des technologies et outils adéquats pour
                                assurer un développement efficace et adaptable.
                              </li>
                              <li>
                                <strong>Prérequis Techniques :</strong>{" "}
                                Définition des exigences techniques pour
                                garantir une base solide pour le déploiement et
                                la croissance future du projet.
                              </li>
                            </ul>
                            <h5>Supervision et Support Technique Continu</h5>
                            <ul>
                              <li>
                                <strong>
                                  Suivi du Progrès et Résolution de Problèmes :
                                </strong>{" "}
                                Surveillance régulière de l&apos;avancement du
                                développement, avec une attention particulière à
                                la résolution proactive des défis techniques.
                              </li>
                              <li>
                                <strong>Assurance de la Conformité :</strong>{" "}
                                Veille à ce que les développements soient
                                alignés avec la vision initiale du projet et
                                respectent les standards de qualité élevés.
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
                content: (
                  <p>
                    <Button
                      variant={"primary"}
                      href={"mailto:bonjour@lucrousseau.com"}
                      label={"Contactez-moi pour discuter de votre projet"}
                    />
                  </p>
                ),
              },
            ]}
          />
        </Container>
        <Container
          id={"pourquoi"}
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
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Pourquoi Faire Appel à un CTO à la Demande
                    </h2>
                    <p className="big">
                      Choisir un CTO à la demande, c&apos;est s&apos;assurer un
                      partenaire qui comprend votre vision et apporte une
                      expertise technique sur mesure pour guider
                      l&apos;innovation et optimiser le développement à chaque
                      étape.
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
                  <>
                    <ol className="align--center">
                      <li className="h3">
                        Évite les erreurs coûteuses, contribue à la réduction
                        des risques et à la sécurisation de votre projet.
                      </li>
                      <li className="h3">
                        Assurance d&apos;excellence technique et cohérence à
                        chaque étape du développement.
                      </li>
                      <li className="h3">
                        Leadership adapté à la construction d&apos;une équipe
                        performante et au choix des technologies.
                      </li>
                      <li className="h3">
                        Rôle central dans la réussite de vos ambitions
                        numériques.
                      </li>
                      <li className="h3">
                        Combinaison d&apos;expertise technique et compétences
                        managériales.
                      </li>
                      <li className="h3">
                        Veille constante sur les tendances pour vous maintenir à
                        l&apos;avant-garde.
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
                                href={"#"}
                                label={
                                  "Contactez-moi pour discuter de votre projet"
                                }
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
        <Container id={"services"} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{ "--padding-bottom": "2rem" }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Mon Offre de Service de CTO à la Demande
                    </h2>
                    <p className="big">
                      Je vous apporte une expertise technique doublée d&apos;une
                      vision stratégique pour assurer l&apos;intégration
                      technologique et l&apos;adaptabilité de votre projet aux
                      défis actuels et futurs.
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
                    title={"Planification Stratégique"}
                    label={"Réservez Votre Session"}
                    className={"align--lg-left"}
                  >
                    <p>
                      Un plan d&apos;action sur mesure pour concrétiser votre
                      vision, incluant un cahier des charges détaillé et une
                      roadmap stratégique.
                    </p>
                    <ul className="small align--left">
                      <li>Session Diagnostique incluse</li>
                      <li>
                        Élaboration d&apos;un plan d&apos;intervention
                        personnalisé
                      </li>
                      <li>Stratégie d&apos;évolution du produit</li>
                      <li>Analyse des technologies adaptées</li>
                      <li>Planification des ressources et du budget</li>
                      <li>Définition d&apos;un calendrier de développement</li>
                      <li>
                        Coordination des plateformes et outils technologiques
                      </li>
                    </ul>
                  </Product>
                ),
              },
              {
                cols: { col: 4, lg: 10, sm: 12 },
                content: (
                  <Product
                    title={"Session Diagnostique"}
                    label={"Réservez Votre Session"}
                    className={"align--lg-left"}
                  >
                    <p>
                      Une heure de consultation stratégique pour faire le point
                      sur vos défis technologiques et identifier les
                      opportunités.
                    </p>
                    <ul className="small align--left">
                      <li>Analyse des défis et opportunités technologiques</li>
                      <li>
                        Conseils basés sur les meilleures pratiques de
                        développement et tendances actuelles
                      </li>
                      <li>
                        Discussion sur l&apos;état de votre stratégie
                        technologique et analyse des risques
                      </li>
                      <li>
                        Orientation pour améliorer l&apos;UX/UI en lien avec vos
                        processus de développement
                      </li>
                      <li>Recommandations pour les prochaines étapes</li>
                    </ul>
                  </Product>
                ),
              },
              {
                cols: { col: 4, lg: 10, sm: 12 },
                content: (
                  <Product
                    title={"Partenariat à Long Terme"}
                    label={"Réservez Votre Session"}
                    className={"align--lg-left"}
                  >
                    <p>
                      Un engagement profond et constant, pour assurer la qualité
                      et l&apos;évolution de votre projet.
                    </p>
                    <ul className="small align--left">
                      <li>
                        Inclus la Session Diagnostique et la Planification
                        Stratégique
                      </li>
                      <li>
                        Gestion proactive et suivi régulier du développement
                        ainsi que des partenaires technologiques
                      </li>
                      <li>
                        Ajustements stratégiques et assurance qualité continue
                      </li>
                      <li>
                        Veille technologique et conseils sur les nouvelles
                        tendances
                      </li>
                      <li>Service de développement web</li>
                    </ul>
                  </Product>
                ),
              },
            ]}
          />
        </Container>
        <Container id={"developpement"} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{
              "--padding-bottom": "2rem",
              "--sm-padding-bottom": "2rem",
            }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Les Langages et Technologies que je Maîtrise
                    </h2>
                    <p className="big">
                      Mon expertise couvre design, développement et gestion de
                      projet, transformant les idées en solutions numériques
                      clés.
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
                    items={[
                      { content: "React", emoji: "⭐️" },
                      { content: "Vue.js", emoji: "⭐️" },
                      { content: "PHP", emoji: "⭐️" },
                      { content: "Webpack", emoji: "⭐️" },
                      { content: "Conception", emoji: "⭐️" },
                      { content: "ChatGPT", emoji: "⭐️" },
                      { content: "Évaluation", emoji: "⭐️" },
                      { content: "Copilote", emoji: "⭐️" },
                      { content: "WordPress", emoji: "⭐️" },
                      { content: "GraphQL", emoji: "⭐️" },
                      { content: "API REST", emoji: "⭐️" },
                      { content: "GIT", emoji: "⭐️" },
                      { content: "Laravel", emoji: "⭐️" },
                      { content: "Agile", emoji: "⭐️" },
                      { content: "BEM", emoji: "⭐️" },
                      { content: "SCSS", emoji: "⭐️" },
                      { content: "Docker", emoji: "⭐️" },
                      { content: "Tailwind", emoji: "⭐️" },
                      { content: "Planification", emoji: "⭐️" },
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
                content: (
                  <p>
                    <Button
                      variant={"primary"}
                      href={"#"}
                      label={"Contactez-moi pour discuter de votre projet"}
                    />
                  </p>
                ),
              },
            ]}
          />
        </Container>
        <Container id={"avantages"} align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{ "--padding-bottom": "2rem" }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Les Avantages de Mon Offre de Service
                    </h2>
                    <p className="big">
                      Je fournis mon expertise technique et ma vision
                      stratégique, stimulant l&apos;innovation et optimisant le
                      développement à des moments essentiels de chaque projet.
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
                    items={[
                      {
                        title: "Expertise en Résolution de Problèmes",
                        emoji: "🔓",
                        content: (
                          <p>
                            Je trouve des solutions innovantes et sur mesure
                            pour vos défis, fort de mon expérience variée.
                          </p>
                        ),
                      },
                      {
                        title: "Orientation vers l'Expérience Utilisateur",
                        emoji: "👥",
                        content: (
                          <p>
                            J&apos;évalue constamment si les efforts de
                            l&apos;équipe correspondent aux besoins de vos
                            utilisateurs, garantissant leur satisfaction.
                          </p>
                        ),
                      },
                      {
                        title: "Décisions Guidées par les Données",
                        emoji: "💬",
                        content: (
                          <p>
                            J&apos;adopte une approche analytique, transformant
                            vos idées en insights actionnables.
                          </p>
                        ),
                      },
                      {
                        title: "Agilité et Adaptabilité",
                        emoji: "🔄",
                        content: (
                          <p>
                            J&apos;utilise des méthodes agiles pour rester
                            flexible et adaptable, assurant une livraison
                            régulière et efficace.
                          </p>
                        ),
                      },
                      {
                        title: "Optimisation de la Productivité",
                        emoji: "⏩",
                        content: (
                          <p>
                            Je crée un environnement de travail dynamique,
                            maximisant la productivité et le bien-être de vos
                            équipes.
                          </p>
                        ),
                      },
                      {
                        title: "Expertise en Codage, IA et Solutions No-Code",
                        emoji: "💻",
                        content: (
                          <p>
                            Je combine le codage traditionnel et les solutions
                            No-Code pour une efficacité maximale adaptée à vos
                            besoins.
                          </p>
                        ),
                      },
                      {
                        title: "Intelligence Artificielle Générative",
                        emoji: "🤖",
                        content: (
                          <p>
                            Je guide l&apos;exploration des horizons de
                            l&apos;intelligence artificielle générative pour
                            maximiser votre potentiel innovant.
                          </p>
                        ),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
          <Row
            style={{ "--padding-top": "2rem", "--sm-padding-top": "2rem" }}
            columns={[
              {
                content: (
                  <p>
                    <Button
                      variant={"primary"}
                      href={"#"}
                      label={"Contactez-moi pour discuter de votre projet"}
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
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Au-delà du Bureau : Passion, Voyage et Photographie
                    </h2>
                    <p className="big">
                      Parce que la vie ne se limite pas à notre travail, je
                      m'évade à travers le voyage et capture le monde sous mon
                      objectif, partageant ainsi mes passions qui m'inspirent au
                      quotidien.
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
                    src={"/images/istanbul-1.jpg"}
                    width={1366}
                    height={1835}
                    alt={"Istanbul"}
                    absolute={true}
                  />
                ),
              },
              {
                cols: { col: 6 },
                rows: { row: 6 },
                content: (
                  <Picture
                    src={"/images/istanbul-2.jpg"}
                    width={2048}
                    height={1366}
                    alt={"Istanbul"}
                    absolute={true}
                  />
                ),
              },
              {
                cols: { col: 6 },
                rows: { row: 6 },
                content: (
                  <Picture
                    src={"/images/seville-1.jpg"}
                    width={2048}
                    height={1365}
                    alt={"Seville"}
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
                content: (
                  <p>
                    <Button
                      variant={"primary"}
                      href={"#"}
                      label={"Contactez-moi pour discuter de votre projet"}
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
    </>
  );
}
