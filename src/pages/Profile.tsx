import React from 'react'
import '../styles/profile.css'
import '../styles/content.css'

const stackLink = 'https://www.google.com/search?q=what is '

function Profile() {
    return (
        <div className='profile content'>
            <h1>Profile</h1>
            <p>Experienced in using Unity Engine for making video games and VR Application. Have developed video game, VR application, and web application. Experienced in using C#, HTML, CSS, and Javascript as a programming language. Familiar with Photon, Go, Python, React.js, Node.js.</p>
            <h1>Programming Language</h1>
            <div className='stacks'>
                <a className="devicon-html5-plain colored" href={stackLink + 'html'}></a>
                <a className="devicon-css3-plain colored" href={stackLink + 'css'}></a>
                <a className="devicon-javascript-plain colored" href={stackLink + 'javascript'}></a>
                <a className="devicon-csharp-plain" href={stackLink + 'csharp'}></a>
                <a className="devicon-go-original-wordmark colored" href={stackLink + 'golang'}></a>
                <a className="devicon-python-plain colored" href={stackLink + 'python'}></a>
                <a className="devicon-java-plain-wordmark colored" href={stackLink + 'java programming language'}></a>
            </div>
            <h1>Framework/Platform/Engine</h1>
            <div className='stacks'>
                <a className="devicon-unity-plain" href={stackLink + 'unity engine'}></a>
                <a className="devicon-react-original colored" href={stackLink + 'react.js'}></a>
                <a className="devicon-nextjs-plain" href={stackLink + 'next.js'}></a>
                <a className="devicon-nodejs-plain-wordmark" href={stackLink + 'node.js'}></a>
                <a className="devicon-express-original-wordmark" href={stackLink + 'express.js'}></a>
                <a className="devicon-microsoftsqlserver-plain-wordmark" href={stackLink + 'sql server'}></a>
                <a className="devicon-mysql-plain-wordmark" href={stackLink + 'mysql'}></a>
                <a className="devicon-mongodb-plain-wordmark colored" href={stackLink + 'mongodb'}></a>
                <a className="devicon-docker-plain colored" href={stackLink + 'docker'}></a>
                <a className="devicon-kubernetes-plain colored" href={stackLink + 'kubernetes'}></a>
                <a className="devicon-bootstrap-plain colored" href={stackLink + 'bootstrap framework'}></a>
                <a className="devicon-photonengine-plain" href={stackLink + 'photon engine'}></a>
                <a className="devicon-amazonwebservices-plain-wordmark colored" href={stackLink + 'aws'}></a>
            </div>

            <div className='test'></div>
        </div>
    )
}

export default Profile