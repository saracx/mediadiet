


export default function User({first}) {
    return (
        <section className="logo-nav">
              <h2>hey&nbsp;{first && <a className="user-name" href={"http://www.twitter.com/" + first} target="_blank">@{first}</a>}</h2>
        </section>
    );
}
