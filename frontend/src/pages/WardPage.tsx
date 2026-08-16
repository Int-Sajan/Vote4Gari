export default function WardPage() {
  return (
    <>
      <section className="dark" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <p className="eyebrow">Markham wards 5 and 7</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Where Gari is running.</h2>
          <p className="lede" style={{ marginTop: 14 }}>Trustee electoral areas M5 + M7 · 2026–2030</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="ward-stats">
            <div className="cell"><div className="num">16</div><div className="lab">Elementary schools</div></div>
            <div className="cell"><div className="num">2</div><div className="lab">Secondary schools</div></div>
            <div className="cell"><div className="num">2</div><div className="lab">Trustee wards</div></div>
            <div className="cell"><div className="num">11</div><div className="lab">Voting days</div></div>
            <div className="cell"><div className="num red">Oct 26</div><div className="lab">Voting closes</div></div>
          </div>
          <p className="lede" style={{ marginTop: 32 }}>Wards M5 and M7 run from Steeles Avenue to 19th Avenue, and from Markham Road east to the Durham line.</p>

          <div className="split" style={{ marginTop: 20, alignItems: 'start' }}>
            <div>
              <p className="fine">Authorized by the campaign of Garishan Ravishankar.</p>
              <div className="school-cols">
                <div>
                  <h4>Elementary schools</h4>
                  <ul>
                    <li>Armadale PS</li><li>Black Walnut PS</li><li>Boxwood PS</li><li>Cedarwood PS</li>
                    <li>Coppard Glen PS</li><li>Cornell Village PS</li><li>David Suzuki PS</li><li>Ellen Fairclough PS</li>
                    <li>Greensborough PS</li><li>Legacy PS</li><li>Little Rouge PS</li><li>Markham Gateway PS</li>
                    <li>Mount Joy PS</li><li>Parkland PS</li><li>Rouge Park PS</li><li>Sam Chapman PS</li>
                  </ul>
                </div>
                <div>
                  <h4>Secondary schools</h4>
                  <ul>
                    <li>Bill Hogarth SS</li><li>Middlefield CI</li>
                  </ul>
                  <h4 style={{ marginTop: 32 }}>Confirm your ward</h4>
                  <p className="lede" style={{ fontSize: 14.5 }}>
                    Not sure which ward you&apos;re in? Check at <a href="https://electionsmarkham.ca" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--signal)', textDecoration: 'underline' }}>electionsmarkham.ca</a>.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img src="/Resources/image-4.jpeg" alt="Map of Markham wards 5 and 7" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
