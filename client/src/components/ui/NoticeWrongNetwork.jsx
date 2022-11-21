import { Row } from 'reactstrap';

function NoticeWrongNetwork() {
  return (
    <section className="section">
      <Row>
        <div className="content">
          <h1 className="text-center">
            Metamask n'est pas connecté sur le bon réseau.
          </h1>
        </div>
      </Row>
    </section>
  );
}

export default NoticeWrongNetwork;
