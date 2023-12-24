import { useState } from 'react'
import { CommentComponent } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Logo Docs</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
          

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus purus nulla, eget aliquam neque consequat non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris finibus elit at dolor convallis egestas ac ut leo. Curabitur eget felis eu eros feugiat vulputate id at dui. Nam elementum ornare semper. Vivamus massa nisl, sodales ac enim ut, bibendum aliquet lorem. Donec eget sapien eget mauris blandit convallis sed ac neque. Aenean vitae vehicula dui. Pellentesque lacinia sapien vel metus varius, sed scelerisque orci tristique. Ut neque ex, pulvinar at nunc quis, imperdiet ornare magna. In urna urna, ullamcorper nec urna eu, viverra sodales augue. Vestibulum vitae nibh id turpis porta eleifend. Proin id metus leo.</p>

<p>Etiam sit amet erat suscipit, ullamcorper nisi sit amet, fringilla turpis. Phasellus ut urna semper, sagittis ipsum a, finibus dui. Proin dictum vitae erat vitae vulputate. Ut aliquet ex non tincidunt finibus. Praesent vitae diam purus. Suspendisse potenti. Morbi justo ante, condimentum id magna euismod, efficitur condimentum ante. Sed sed enim vitae enim eleifend efficitur. Sed hendrerit blandit lectus vel sagittis.</p>

<p>Duis in ipsum blandit, venenatis nisl nec, venenatis nisi. Vivamus interdum consequat ornare. Sed id diam quam. Suspendisse a ex a mauris maximus vehicula vitae a nibh. Sed blandit laoreet dui, a volutpat magna rhoncus id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor, libero ut scelerisque varius, eros nibh aliquam diam, non cursus nunc nunc et velit. Nulla facilisi. Donec scelerisque lorem sit amet pharetra venenatis. Fusce dolor metus, condimentum quis sodales quis, placerat vulputate nunc. Duis iaculis rhoncus tincidunt.</p>

<p>Aenean consectetur sit amet neque eget euismod. Ut dictum ac nulla eu aliquet. In laoreet vitae turpis iaculis condimentum. Nulla et sem vulputate, convallis nisl ut, eleifend velit. Proin commodo tincidunt metus nec rhoncus. Suspendisse metus ex, accumsan in aliquet in, ultrices a leo. Maecenas nec velit orci. Suspendisse condimentum, turpis at faucibus aliquet, metus augue dignissim ex, vel blandit est augue cursus ligula. Quisque porta urna a massa scelerisque consequat.</p>

<p>Ut eleifend tincidunt cursus. Proin risus ex, varius sit amet blandit in, pellentesque ornare nisi. In mollis gravida feugiat. Etiam sollicitudin ante sed ex feugiat gravida nec vel sem. Sed lacinia consectetur quam, id lobortis turpis condimentum sit amet. Morbi quis dolor nec nulla mattis imperdiet. Integer eu diam cursus, scelerisque eros scelerisque, vestibulum quam. Pellentesque quis eleifend ante, vitae porta nunc. Donec lacus turpis, commodo in ligula et, viverra rutrum risus. Duis ut dui id justo egestas vestibulum. Sed consectetur, ipsum sit amet pretium elementum, ante eros dictum enim, ullamcorper dictum tellus diam et enim. Etiam purus risus, fringilla non libero in, ornare molestie augue. Nam aliquet, nunc id tempor vulputate, sapien felis faucibus risus, sit amet varius massa diam id mauris. Phasellus pellentesque, lectus at luctus iaculis, ipsum nisl volutpat risus, a fermentum elit leo rhoncus diam. Nullam sit amet justo tellus. </p>
      </div>
      <p>
        <hr></hr>
      </p>
        <div style={{width: "400px", display: "flex", flexDirection: "column", margin: "20px auto"}}>
          <CommentComponent />
        </div>
    </>
  )
}

export default App
