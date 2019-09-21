import React, {Component} from 'react';
import ChangeLog from '../../CHANGELOG.md';
export default class ChangeLogDOC extends Component {
    render() {
        return (
            <div>
                <h1>更新日志</h1>
                <div>更新日志由提交记录生成, 主要是 Bug Fixes 和 Features的记录, 更多细节请查看 commits.</div>
                <ChangeLog></ChangeLog>
            </div>
        );
    }
}
