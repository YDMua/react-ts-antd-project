import * as React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { LoginPage, LoginPageWrap } from './style'
import { IProps } from './type'
import { observer, inject } from 'mobx-react'
import loginBg from '@images/login-bg.png'

const FormItem = Form.Item
@inject('globalStore')
@observer
class Login extends React.Component<IProps> {
  handleSubmit = (e: any) => {
    try {
      e.preventDefault()
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          if (values.userName === 'yidong' && values.password === '123123') {
            message.success('Login successful')
            this.props.globalStore.changeUserInfo({
              user_name: '小蚁',
              age: 18
            })
            setTimeout(() => {
              this.props.history.push('/')
            }, 1000)
          } else {
            message.error('Login failed')
          }
        }
      })
    } catch (error) {
      message.error('Login failed')
    }
  }
  render() {
    const { userInfo } = this.props.globalStore
    const { getFieldDecorator } = this.props.form
    return (
      <LoginPage style={{ backgroundImage: `url(${loginBg})` }}>
        <LoginPageWrap>
          <div className="login-form-title">欢迎登录 {userInfo.user_name}</div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <div>
                <Button htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </div>
            </FormItem>
          </Form>
        </LoginPageWrap>
      </LoginPage>
    )
  }
}
const LoginForm = Form.create()(Login)
export default LoginForm
