import React, { useEffect, useRef } from "react";

function CkEditorComponent({ onChange, editorLoaded, name, data }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "300px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          type=""
          name={name}
          editor={ClassicEditor}
          data={data}
          onChange={(event, editor) => {
            const content = editor.getData();
            onChange(content);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default CkEditorComponent;
