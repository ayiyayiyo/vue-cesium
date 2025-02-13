import createFragmentFromTemplate from './createFragmentFromTemplate'

const loadView = function (htmlString, container, viewModel) {
  container = Cesium.getElement(container)

  const fragment = createFragmentFromTemplate(htmlString)

  // Sadly, fragment.childNodes doesn't have a slice function.
  // This code could be replaced with Array.prototype.slice.call(fragment.childNodes)
  // but that seems slightly error prone.
  const nodes = []

  var i
  for (i = 0; i < fragment.childNodes.length; ++i) {
    nodes.push(fragment.childNodes[i])
  }

  container.appendChild(fragment)

  for (i = 0; i < nodes.length; ++i) {
    var node = nodes[i]
    if (node.nodeType === 1 || node.nodeType === 8) {
      Cesium.knockout.applyBindings(viewModel, node)
    }
  }

  return nodes
}

export default loadView
