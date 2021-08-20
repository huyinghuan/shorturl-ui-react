import { FC } from 'react';
import marked from "marked";
import { useParams } from "react-router"
import { useEffect, useState } from 'react';
const DocsPages: FC = () => {
    const { doc } = useParams<{ doc: string }>();
    const [content, setContent] = useState("")
    useEffect(() => {
        fetch(`/api/doc/${doc}`)
            .then(response => {
                return response.text()
            })
            .then(text => {
                setContent(marked(text))
            })
    }, [doc])

    return <section style={{ height: '100%', overflowY: 'auto', backgroundColor: 'white' }}>
        <article dangerouslySetInnerHTML={{ __html: content }}></article>
    </section>
}

export default DocsPages