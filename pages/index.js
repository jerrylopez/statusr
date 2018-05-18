import Head from '../components/Head'
import StatusBar from '../components/StatusBar'
import ServiceList from '../components/ServiceList'
import config from '../statusr.config'

import css from '../styles/pages/index.scss'

const Index = (props) => (
  <div className={css.container}>
    <Head title="Home" />
    <StatusBar statusr={config} />
    <ServiceList statusr={config} />
  </div>
)

Index.getInitialProps = async function () {
  return {}
}

export default Index
