import X2JS from "../../../libs/x2js"

import styles from "./downloadButton.module.css"

type DownloadButtonProps = {
    data: any
}

export default function DownloadButton({ data }: DownloadButtonProps) {
    return (
        <button className={styles.button} onClick={() => {
            console.log(data)
            var x2js = new X2JS();

            const downloadString = x2js.json2xml_str(data)
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadString));
            element.setAttribute('download', "data.xml");

            element.style.display = 'none';
            // document.body.appendChild(element);

            element.click();

            // document.body.removeChild(element);
        }}>Download selected data</button>
    )
}

function OBJtoXML(obj: any) {
    var xml = '';
    for (var prop in obj) {
        // if the variable is an normal type we append 
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
}