export default function DonatePage() {
  return (
    <>
      <section className="dark" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <p className="eyebrow">Donate</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Support the campaign.</h2>
          <p className="lede" style={{ marginTop: 14 }}>Every dollar goes toward reaching voters in wards 5 and 7 before Oct 26.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <span className="badge">Set-up needed before this page goes live</span>
          <p className="lede" style={{ marginTop: 16 }}>Two ways to give are outlined below. The e-Transfer option can go live as soon as you confirm it; the online option needs a compliant donation processor connected first. See the note under that card.</p>

          <div className="donate-grid">
            <div className="donate-card">
              <span className="badge">Available now</span>
              <h3>Interac e-Transfer</h3>
              <p>Send an e-Transfer to the campaign's dedicated bank account at <strong>vote4garishan@gmail.com</strong>. Include your full name and postal code in the message so the campaign can issue a proper receipt under the Municipal Elections Act, 1996.</p>
            </div>
            <div className="donate-card">
              <span className="badge">Needs setup</span>
              <h3>Donate online</h3>
              <p>For card and Apple Pay/Google Pay donations, this campaign should connect a municipal-election-compliant donation processor (for example a service built for Ontario municipal campaigns) so contribution limits and receipting are handled correctly. Once you have that account, this card is where its embed or link goes.</p>
            </div>
          </div>

          <p className="fine" style={{ maxWidth: 640 }}>This site can't process real payments on its own. Donations for a municipal campaign have to be collected in a way that meets Ontario's Municipal Elections Act rules on contribution limits and receipts. Worth confirming the exact setup with Elections Markham or a campaign compliance advisor before this page goes live.</p>
        </div>
      </section>
    </>
  );
}
