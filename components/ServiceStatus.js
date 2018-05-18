import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import css from '../styles/components/serviceList.scss'

function ServiceStatus ({
    ownProps: { statusr },
    data: { loading, error, repository}
}) {
    let status = getStatus(repository.label.issues, statusr)

    return (
        <span className={css.serviceStatus} style={status.style}>{status.name}</span>
    )
}

function getStatus(issues, statusr) {
    if (issues.totalCount < 1) {
        return {
            name: statusr.status.default,
            style: {
                color: statusr.status.defaultColor
            }
        }
    } else {
        let labels = issues.nodes[0].labels.nodes.filter((label) => {
            return statusr.status.labels.indexOf(label.name) > -1
        })

        if (labels.length < 1) {
            return {
                name: statusr.status.default,
                style: {
                    color: statusr.status.defaultColor
                }
            }
        }
        
        return {
            name: labels[0].name,
            style: {
                color: `#${labels[0].color}`
            }
        }
    }
}

const label = gql`
    query ServiceStatus($owner: String!, $name: String!, $service: String!) {
        repository(owner:$owner, name:$name) {
            label(name:$service){
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
            owner: ownProps.statusr.github.username,
            name: ownProps.statusr.github.repository,
            service: ownProps.service
        },
    }),
    props: ({ ownProps, data }) => {
      return ({
        ownProps,
        data
      })
    }
})(ServiceStatus)
