import Row from "../components/Layout/Row";
import Container from "../components/Layout/Container";

import Header from "../sections/Header";
import Footer from "../sections/Footer";

import Picture from "../components/Picture";
import Booking from "../components/Booking";

export default function Home() {
  return null;

  return (
    <>
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
        <Container align={"center"} halign={"center"}>
          <Row
            halign={"center"}
            style={{ "--padding-bottom": "2rem" }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: (
                  <>
                    <h2 className="underline underline--center">
                      Réserver une Session Diagnostic CTO
                    </h2>
                    <p className="big">
                      Cette session est l&apos;occasion idéale de plonger dans
                      les détails de vos défis technologiques, d&apos;explorer
                      des opportunités d&apos;innovation et d&apos;esquisser des
                      solutions personnalisées.
                    </p>
                  </>
                ),
              },
            ]}
          />
          <Row
            valign={"middle"}
            columns={[
              {
                cols: { sm: 12 },
                align: "left",
                content: (
                  <>
                    <h3>
                      Réservez votre session dès maintenant et faisons le
                      premier pas ensemble vers la réalisation de votre vision
                      technologique.
                    </h3>
                    <Booking />
                    <p className="small">
                      La &quot;Session Diagnostique CTO&quot; est un premier pas
                      essentiel pour aligner vos ambitions technologiques avec
                      des stratégies réalisables. Elle pose les fondations
                      d&apos;une collaboration fructueuse, que ce soit pour une
                      simple consultation ou un partenariat à long terme.
                    </p>
                  </>
                ),
              },
              {
                cols: { sm: 12 },
                content: (
                  <Picture
                    src={"https://via.placeholder.com/1200"}
                    alt={"Placeholder Image"}
                  />
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
