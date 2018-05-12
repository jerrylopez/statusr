import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ServiceStatus from './ServiceStatus'

import css from '../styles/components/serviceList.scss'

function ServiceList ({
    data: { loading, error, repository}
}) {
    let services = getServices(repository.labels.edges)

    return (
        <div className={css.section}>
            <h2 className={css.sectionTitle}>Services</h2>
            
            <ul className={css.services}>
                {services.map((service) => (
                    <li key={service.id} className={css.service}>
                        <span className={css.serviceName}>{service.name}</span>
                        <ServiceStatus serviceName={service.githubName} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function getServices(labels) {
    return labels.filter((label) => {
        return label.node.name.includes('Service:')
    }).map((label) => {
        return {
            id: label.node.id,
            githubName: label.node.name,
            name: label.node.name.replace('Service: ', '')
        }
    })
}

export const labels = gql`
    query ServiceList {
        repository(owner:"jerrylopez", name:"dus-demo") {
            labels(first:20){
                totalCount
                edges{
                    node{
                        id
                        name
                        color
                    }
                }
            }
        }
    }
`

export default graphql(labels, {
    props: ({ data }) => {
      return ({
        data
      })
    }
})(ServiceList)
