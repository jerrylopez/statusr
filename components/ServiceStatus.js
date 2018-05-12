import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import css from '../styles/components/serviceList.scss'

function ServiceStatus ({
    data: { loading, error, repository}
}) {
    let status = getStatus(repository.label.issues)
    console.log(status)
    return (
        <span className={css.serviceStatus} style={status.style}>{status.name}</span>
    )
}

function getStatus(issues) {
    if (issues.totalCount < 1) {
        return {
            name: 'Operational',
            style: {
                color: '#2fcc66'
            }
        }
    } else {
        let labels = issues.nodes[0].labels.nodes.filter((label) => {
            return label.name.includes('Status:')
        })
        
        return {
            name: labels[0].name.replace('Status: ', ''),
            style: {
                color: `#${labels[0].color}`
            }
        }
    }
}

const label = gql`
    query ServiceStatus($labelName: String!) {
        repository(owner:"jerrylopez", name:"dus-demo") {
            label(name:$labelName){
                issues(last:1, states:OPEN){
                    totalCount
                    nodes{
                        labels(first:20){
                            nodes{
                                name
                                color
                            }
                        }
                    }
                }
            }
        }
    }
`

export default graphql(label, {
    options: (ownProps) => ({
        variables: {
            labelName: ownProps.serviceName
        },
    }),
    props: ({ ownProps, data }) => {
      return ({
        ownProps,
        data
      })
    }
})(ServiceStatus)
